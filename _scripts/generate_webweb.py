"""
Generate _data/webweb.json from three sources:
  1. ORCID public API  — published works linked to ORCID ID
  2. Crossref API      — full co-author lists for papers with DOIs
  3. _data/papers.yml  — preprints / works not yet on ORCID + software projects
  4. _data/people.yml  — name → kind mapping (direct / indirect / myself)

Run automatically via GitHub Actions before Jekyll builds.
"""

import json
import yaml
import requests
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────
ORCID_ID   = "0000-0001-9019-0730"
MYSELF     = "Zachary Caterer"

COLORS = {
    "myself":           "#FFA500",
    "direct":           "#E01E7B",
    "indirect":         "#999999",
    "paper":            "#1C7BE0",
}
SIZES = {
    "myself": 4.0,
    "direct": 3.0,
    "indirect": 1.0,
    "paper": 2.0,
}

data_dir = Path(__file__).parent.parent / "_data"

# ── Load people.yml ───────────────────────────────────────────────────────────
with open(data_dir / "people.yml") as f:
    people_data = yaml.safe_load(f)

name_to_kind: dict[str, str] = {}
for person in people_data.get("people", []):
    kind = person.get("kind", "indirect")
    name_to_kind[person["name"]] = kind
    for alias in person.get("alias") or []:
        name_to_kind[alias] = kind

def person_kind(name: str) -> str:
    return name_to_kind.get(name, "indirect")

# ── Graph helpers ─────────────────────────────────────────────────────────────
edge_list: list[list[str]] = []
nodes: dict[str, dict] = {}
seen_titles: set[str] = set()   # dedup papers across sources

def add_node(name: str, kind: str) -> None:
    if name not in nodes:
        nodes[name] = {
            "name":  name,
            "kind":  kind,
            "size":  SIZES.get(kind, 1.0),
            "color": COLORS.get(kind, "#999999"),
        }

def add_paper(title: str, authors: list[str]) -> None:
    """Add a paper node + edges to all authors. Skip if already seen."""
    if title in seen_titles:
        return
    seen_titles.add(title)
    add_node(title, "paper")
    # always ensure Zach is present
    for author in (authors if authors else [MYSELF]):
        kind = "myself" if author == MYSELF else person_kind(author)
        add_node(author, kind)
        edge_list.append([title, author])

# ── 1. ORCID — get works list ─────────────────────────────────────────────────
print("Fetching ORCID works...")
orcid_dois: dict[str, str] = {}   # title → doi
try:
    resp = requests.get(
        f"https://pub.orcid.org/v3.0/{ORCID_ID}/works",
        headers={"Accept": "application/json"},
        timeout=20,
    )
    resp.raise_for_status()
    for group in resp.json().get("group", []):
        summaries = group.get("work-summary", [])
        if not summaries:
            continue
        s     = summaries[0]
        title = s.get("title", {}).get("title", {}).get("value", "").strip()
        if not title:
            continue
        doi = next(
            (
                eid.get("external-id-value", "").strip()
                for eid in s.get("external-ids", {}).get("external-id", [])
                if eid.get("external-id-type") == "doi"
            ),
            None,
        )
        orcid_dois[title] = doi  # doi may be None
        print(f"  ORCID: {title[:60]}  doi={doi}")
except Exception as e:
    print(f"  ORCID fetch failed: {e}")

# ── 2. Crossref — get full author lists for DOIs ──────────────────────────────
print("Fetching Crossref author data...")
for title, doi in orcid_dois.items():
    authors = [MYSELF]
    if doi:
        try:
            cr = requests.get(
                f"https://api.crossref.org/works/{doi}",
                headers={"User-Agent": f"caterer-z-t.github.io; mailto:ztcaterer@colorado.edu"},
                timeout=15,
            )
            if cr.ok:
                for a in cr.json().get("message", {}).get("author", []):
                    full = f"{a.get('given', '')} {a.get('family', '')}".strip()
                    if full:
                        authors.append(full)
                print(f"  Crossref OK: {title[:55]}  ({len(authors)} authors)")
        except Exception as e:
            print(f"  Crossref error for {doi}: {e}")
    add_paper(title, authors)

# ── 3. papers.yml — preprints + software projects ─────────────────────────────
print("Loading papers.yml...")
with open(data_dir / "papers.yml") as f:
    papers_data = yaml.safe_load(f)

for category in papers_data.get("categories", []):
    for pub in category.get("pubs", []):
        title   = pub.get("title", "").strip()
        authors = pub.get("authors", [MYSELF])
        if title:
            add_paper(title, authors)

# ── Assemble webweb ───────────────────────────────────────────────────────────
webweb = {
    "display": {
        "sizeBy":            "size",
        "colorBy":           "color",
        "hideMenu":          True,
        "showLegend":        False,
        "gravity":           0.05,
        "width":             400,
        "height":            400,
        "linkLength":        40,
        "scaleLinkOpacity":  True,
        "scaleLinkWidth":    True,
        "nameToMatch":       MYSELF,
        "backgroundColor":   "transparent",
    },
    "networks": {
        "webweb": {
            "layers": [{"edgeList": edge_list, "nodes": nodes, "metadata": None}]
        }
    },
    "title": "webweb",
}

out_path = data_dir / "webweb.json"
with open(out_path, "w") as f:
    json.dump(webweb, f, separators=(",", ":"))

print(f"\nDone: {out_path}")
print(f"  {len(nodes)} nodes  |  {len(edge_list)} edges  |  {len(seen_titles)} papers")
