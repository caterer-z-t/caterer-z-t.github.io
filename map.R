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

# keep only the unique titles from each city
flattened_df <- flattened_df %>%
    distinct(city, project_name, .keep_all = TRUE)
print(head(flattened_df))

library(dplyr)
library(leaflet)
library(htmlwidgets)

flattened_df %>%
    filter(!is.na(lat) & !is.na(lon)) %>%
    group_by(lat, lon) %>%
    mutate(lab = paste(
        str_c("<b>Location: </b>", city, "<br>"),
        str_c("<b>Title: </b>", project_name, "<br>",
            str_c(str_c('<a href="', url, '" target="_PARENT">More Info</a>'),
                sep = "<br>"
            ),
            collapse = "<br><br>"
        ),
        sep = ""
    )) %>%
    ungroup() %>%
    leaflet() %>%
    addProviderTiles(providers$CartoDB.Positron) %>%
    addMarkers(
        lng = ~lon, lat = ~lat,
        popup = ~lab, 
        label = "Click for Projects"
    ) 
