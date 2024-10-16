from collections import defaultdict
from webweb import Web
from pathlib import Path
import yaml

# Define constants for paths
DATA_PATH = Path(__file__).parent.joinpath("_data")
PAPERS_PATH = DATA_PATH.joinpath("papers.yml")
PEOPLE_PATH = DATA_PATH.joinpath("people.yml")
WEBWEB_JSON_PATH = DATA_PATH.joinpath("index_web.json")

# Map node types to colors
KIND_TO_COLOR_MAP = {
    "collaborator": "#78C81F",
    "direct contact": "#E01E7B",
    "paper": "#1C7BE0",
}


# Function to load YAML data from a file
def load_yaml(path):
    return yaml.load(path.read_text(), Loader=yaml.FullLoader)


# Function to clean names
def clean_name(name):
    return name.rstrip("*.")


# Function to create a mapping of names to aliases
def people_to_aliases(all_people):
    aliases = {}
    for person in all_people["people"]:
        person_name = clean_name(person["name"])
        aliases[person_name] = person_name
        for alias in person.get("aliases", []):
            aliases[clean_name(alias)] = person_name
    return aliases


# Main function to create the network
def make_network(data):
    nodes = defaultdict(dict)
    edges = []

    zachary_name = "Zachary Caterer"

    for category in data["papers"]["categories"]:
        for paper in category["pubs"]:
            title = paper["title"]
            nodes[title] = {"name": title, "kind": "paper"}

            for name in paper["authors"]:
                cleaned_name = clean_name(name)
                if cleaned_name == zachary_name:
                    continue

                nodes[cleaned_name]["name"] = cleaned_name
                nodes[cleaned_name]["kind"] = "collaborator"
                edges.append([title, cleaned_name])

    for person in data["people"]["people"]:
        name = clean_name(person["name"])
        nodes[name]["name"] = name
        nodes[name]["kind"] = "direct contact"

    for node in nodes:
        kind = nodes[node]["kind"]
        nodes[node]["size"] = 1.4 if kind == "direct contact" else 0.6
        nodes[node]["color"] = KIND_TO_COLOR_MAP[kind]

    web = Web(adjacency=edges, nodes=dict(nodes))
    web.display.sizeBy = "size"
    web.display.colorBy = "color"
    web.display.hideMenu = True
    web.display.showLegend = False
    web.display.gravity = 0.55
    web.display.width = 400
    web.display.height = 400
    web.display.scaleLinkOpacity = True
    web.display.scaleLinkWidth = True

    WEBWEB_JSON_PATH.write_text(web.json)
    web.show()


if __name__ == "__main__":
    # Load data
    data = {
        "papers": load_yaml(PAPERS_PATH),
        "people": load_yaml(PEOPLE_PATH),
    }
    # Create aliases
    aliases = people_to_aliases(data["people"])

    # Clean names in the data
    for category in data["papers"]["categories"]:
        for paper in category["pubs"]:
            paper["authors"] = [
                aliases.get(clean_name(name), name) for name in paper["authors"]
            ]

    # Create the network
    make_network(data)
