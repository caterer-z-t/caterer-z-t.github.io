library(tidyverse)
library(tidygeocoder)
library(leaflet)
library(yaml)
library(dplyr)
library(purrr)
library(leaflet.providers)
library(htmlwidgets)

# Read the YAML file
yaml_file <- "/Users/zc/Documents/caterer-z-t.github.io/_data/projects.yml"
projects_data <- read_yaml(yaml_file)

# Initialize the dataframe with the correct column names
flattened_df <- data.frame(
    city = character(), lat = numeric(), lon = numeric(),
    project_name = character(), category = character(),
    url = character(), image_path = character(), stringsAsFactors = FALSE
)

for (i in 1:length(projects_data$locations)) {
    print(projects_data$locations[[i]]$city)
    city <- projects_data$locations[[i]]$city
    # Get the latitude and longitude of the city
    lat <- projects_data$locations[[i]]$lat
    lon <- projects_data$locations[[i]]$lon

    for (j in 1:length(projects_data$locations[[i]]$entries)) {
        # Fill missing values with ''
        project_name <- ifelse(!is.null(projects_data$locations[[i]]$entries[[j]]$name),
            projects_data$locations[[i]]$entries[[j]]$name, ""
        )
        category <- ifelse(!is.null(projects_data$locations[[i]]$entries[[j]]$category),
            projects_data$locations[[i]]$entries[[j]]$category, ""
        )
        url <- ifelse(!is.null(projects_data$locations[[i]]$entries[[j]]$url),
            projects_data$locations[[i]]$entries[[j]]$url, ""
        )
        image_path <- ifelse(!is.null(projects_data$locations[[i]]$entries[[j]]$image_path),
            projects_data$locations[[i]]$entries[[j]]$image_path, ""
        )

        # Create a new row as a data frame with the appropriate column names
        new_row <- data.frame(
            city = city, lat = lat, lon = lon,
            project_name = project_name, category = category,
            url = url, image_path = image_path, stringsAsFactors = FALSE
        )

        # Bind the new row to the dataframe
        flattened_df <- rbind(flattened_df, new_row)
    }
}

# 
# Convert to tibble for geocoding
flattened_df <- as_tibble(flattened_df)
print(head(flattened_df))

library(dplyr)
library(leaflet)
library(htmlwidgets)

# Create the map and add custom interaction for the modal
flattened_df %>%
    filter(!is.na(lat) & !is.na(lon)) %>%
    group_by(lat, lon) %>%
    mutate(lab = paste(
        str_c("<b>Location: </b>", city, "<br>"),
        str_c("<b>Projects:</b><br>",
            str_c(project_name,
                str_c('<a href="', url, '" target="_PARENT">Program Info</a>'),
                sep = "<br>"
            ),
            collapse = "<br><br>"
        ),
        sep = ""
    )) %>%
    ungroup() %>%
    leaflet() %>%
    addProviderTiles(providers$CartoDB.Positron) %>%
    addCircleMarkers(
        lng = ~lon, lat = ~lat,
        radius = 5, color = "blue", fillOpacity = 0.5,
        popup = NULL, # Disable default popup
        label = "Click for Projects"
    ) %>% # Add a label
    htmlwidgets::onRender("
    function(el, x) {
        var markers = this._map._layers;

        // Disable the default popups and ensure the modal displays
        for (var key in markers) {
            var marker = markers[key];
            if (marker instanceof L.Marker) {
                marker.on('click', function(e) {
                    var lat = e.latlng.lat;
                    var lon = e.latlng.lng;
                    var popupContent = e.target.options.label;

                    // Create the modal container dynamically
                    var modalContainer = document.createElement('div');
                    modalContainer.style.position = 'fixed';
                    modalContainer.style.top = '0';
                    modalContainer.style.left = '0';
                    modalContainer.style.width = '100vw';
                    modalContainer.style.height = '100vh';
                    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    modalContainer.style.zIndex = 9999;
                    modalContainer.style.overflow = 'auto';
                    modalContainer.style.display = 'flex';
                    modalContainer.style.justifyContent = 'center';
                    modalContainer.style.alignItems = 'center';

                    // Create the modal content box
                    var modalContent = document.createElement('div');
                    modalContent.style.backgroundColor = 'white';
                    modalContent.style.padding = '20px';
                    modalContent.style.borderRadius = '10px';
                    modalContent.style.maxHeight = '80vh';
                    modalContent.style.overflowY = 'scroll';

                    // Insert the content (using popupContent as an example)
                    modalContent.innerHTML = popupContent;

                    // Append the modal content to the container
                    modalContainer.appendChild(modalContent);
                    document.body.appendChild(modalContainer);

                    // Close modal when clicking outside of the modal content
                    modalContainer.onclick = function(event) {
                        if (event.target === modalContainer) {
                            document.body.removeChild(modalContainer);
                        }
                    };
                });
            }
        }
    }
  ") %>%
    saveWidget(here::here("_includes/projects", "map.html")) # save map widget
