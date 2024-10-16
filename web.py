import yaml
from webweb import Web
from pathlib import Path

# Define the paths to the YAML data files
data_path = Path(__file__).parent.joinpath("_data")
papers_path = data_path.joinpath("papers.yml")
people_path = data_path.joinpath("people.yml")
webjson_path = data_path.joinpath("webweb.json")

# Function to load YAML data from a file
def load_yaml(path: Path):
    return yaml.load(path.read_text(), Loader=yaml.FullLoader)


# Load the papers and people data
papers_data = load_yaml(papers_path)
people_data = load_yaml(people_path)

# Get Zachary Caterer's aliases
zach_aliases = [
    person["alias"]
    for person in people_data["people"]
    if person["name"] == "Zachary Caterer"
][0]

# Create a list to hold all connections (adjacency list)
adjacency = []

# Create node attributes (to define node sizes and colors)
node_attributes = {}

# Assign node attributes for Zachary first
zachary_name = "Zachary Caterer"
node_attributes[zachary_name] = {"nodeType": 5}  # Fixed size for Zachary

# Iterate through the papers to find connections and add intermediate project title nodes
for category in papers_data["categories"]:
    for paper in category["pubs"]:
        authors = paper["authors"]
        project_title = paper["title"]

        # Add the project title node and a connection from Zachary to the project title
        if any(alias in authors for alias in zach_aliases):
            adjacency.append([zachary_name, project_title])
            node_attributes[project_title] = {
                "nodeType": 2
            }  # Medium size for project titles

            # Connect the project title to other authors
            for author in authors:
                if author not in zach_aliases:  # Skip Zachary's aliases
                    adjacency.append([project_title, author])

                    # Find the author in the people_data and get their size
                    for person in people_data["people"]:
                        if person["name"] == author:
                            # Use the size defined in the people.yml file
                            size = person.get(
                                "size", 1
                            )  # Default size is 1 if not specified
                            node_attributes[author] = {"nodeType": size}

# Create the Webweb project with the adjacency list and node attributes
web = Web(
    adjacency=adjacency,
    display={
        "nodes": node_attributes,
    },
)

# Set how the nodes should be displayed based on their type (nodeType values for size)
web.display.sizeBy = "nodeType"
web.display.colorBy = "nodeType"  # Color nodes by node type if desired
web.display.gravity = 0.1
web.display.charge = 100
web.display.linkLength = 40
web.display.width = 400
web.display.height = 400
web.display.scaleLinkOpacity = False
web.display.scaleLinkWidth = True
web.display.showControl = False
web.display.hideMenu = True
web.display.nameToMatch = "Zachary Caterer"
web.display.showLegend = False

# Export the graph data as JSON
# web.display.write_json("index_web.json")
# web.save("webweb.html")
webjson_path.write_text(web.json)

# Show the network visualization
web.show()
