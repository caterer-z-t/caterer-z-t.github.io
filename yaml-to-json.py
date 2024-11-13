import yaml
import json

# Specify the input and output file paths
yaml_file = "_data/projects.yml"
json_file = "_data/projects.json"

# Load YAML data
with open(yaml_file, "r") as f:
    yaml_data = yaml.safe_load(f)

# Convert to JSON and save
with open(json_file, "w") as f:
    json.dump(yaml_data, f, indent=2)

print(f"Converted {yaml_file} to {json_file}")
