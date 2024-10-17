from collections import defaultdict
from webweb import Web
from pathlib import Path
import yaml

# Define constants for paths
DATA_PATH = Path(__file__).parent.joinpath("_data")
PAPERS_PATH = DATA_PATH.joinpath("papers.yml")
PEOPLE_PATH = DATA_PATH.joinpath("people.yml")
WEBWEB_JSON_PATH = DATA_PATH.joinpath("webweb.json")

# Map titles to colors
TITLE_TO_COLOR_MAP = {
    "PhD Student": "#FFA500",  # Orange
    "Principle Investigator": "#FF6347",  # Tomato
    "Post-Doctoral Researcher": "#32CD32",  # Lime Green
    "collaborator": "#1E90FF",  # Dodger Blue
    "myself": "#FFD700",  # Gold
    "direct contact": "#FF4500",  # Orange Red
    "paper": "#8A2BE2",  # Blue Violet
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
        for alias in person.get("alias", []):
            aliases[clean_name(alias)] = person_name
    return aliases


# Function to determine node size based on size in YAML
def get_node_size(node_info):
    # Set paper size to 2, otherwise use the specified size
    if node_info["kind"] == "paper":
        return 2.0
    return node_info.get("size", 0.6)  # Default to 0.6 if size is not specified


# Main function to create the network
def make_network(data):
    nodes = defaultdict(dict)
    edges = []

    zachary_name = "Zachary Caterer"

    # Add yourself as a node
    nodes[zachary_name] = {
        "name": zachary_name,
        "kind": "myself",
        "size": 10,
    }  # Use size from YAML

    for category in data["papers"]["categories"]:
        for paper in category["pubs"]:
            title = paper["title"]
            nodes[title] = {"name": title, "kind": "paper"}

            for name in paper["authors"]:
                cleaned_name = clean_name(name)

                # Add edge to yourself if you are an author
                if cleaned_name == zachary_name:
                    edges.append([title, zachary_name])
                    continue  # Skip further processing for yourself

                # Add collaborators
                if cleaned_name not in nodes:
                    nodes[cleaned_name] = {"name": cleaned_name, "kind": "collaborator"}
                else:
                    # If already exists, make sure it's marked as collaborator
                    nodes[cleaned_name]["kind"] = "collaborator"

                edges.append([title, cleaned_name])

    # Process people data
    for person in data["people"]["people"]:
        name = clean_name(person["name"])
        size = person.get("size", 0.6)  # Default size to 0.6 if not specified
        if name not in nodes:  # Avoid overwriting existing nodes
            nodes[name] = {"name": name, "kind": person["kind"], "size": size}
        else:
            nodes[name]["size"] = size  # Update size if already exists

    # Assign sizes and colors to nodes
    for node in nodes:
        nodes[node]["size"] = get_node_size(
            nodes[node]
        )  # Set size using the updated function
        # Set color based on the title instead of kind
        title = next(
            (
                person["title"]
                for person in data["people"]["people"]
                if clean_name(person["name"]) == node
            ),
            None,
        )
        nodes[node]["color"] = TITLE_TO_COLOR_MAP.get(
            title, "#FFFFFF"
        )  # Default to white if title not found

    # Create and display the web
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
    web.display.nameToMatch = "Zachary Caterer"

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
