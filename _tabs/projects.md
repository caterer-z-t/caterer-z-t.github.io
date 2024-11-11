---
layout: page
title: Projects
icon: fa-regular fa-lightbulb
order: 4
---

<div id="map" style="height: 500px;"></div>

<!-- Modal for showing more details about a project -->
<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <div id="modal-content-body"></div> <!-- Dynamic content for each project -->
  </div>
</div>

<script src="https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js"></script>
<script>
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2F0ZXJlci16LXQiLCJhIjoiY20zY2Q5ZDV1MXo3ODJwb21sanl1cTQyNyJ9.L2D8ZEFu32joMfixxs2Pnw';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/caterer-z-t/cm3d5pd4i000n01rdcj6z0scx',
        center: [-105.270546, 40.014984], // Center of the map (USA)
        zoom: 4,
        pitch: 35,
        bearing: 0,
        minZoom: 1,
        maxZoom: 20
    });

    // Fetch locations from the YAML file
    fetch('{{ site.baseurl }}/_data/projects.yml')  // Adjust the path for Jekyll
        .then(response => response.text())
        .then(yamlText => {
            const locationsFromYaml = jsyaml.load(yamlText); // Parse YAML into JavaScript object

            // Loop through the locations
            locationsFromYaml.locations.forEach(location => {
                const marker = new mapboxgl.Marker()
                    .setLngLat([location.lon, location.lat])
                    .addTo(map);

                // Build modal content dynamically
                const buildModalContent = location.entries.map(entry => {
                    let urlLink = ''; // Initialize an empty string for the URL link

                    if (entry.url) {
                        urlLink = `<p><a href="${entry.url}" target="_blank">More Info</a></p>`;
                    }

                    return `<div>
                                <h3>${entry.name}</h3>
                                <p><strong>${entry.affiliation}</strong></p>
                                <p>${entry.date ? `<em>Date: ${entry.date}</em>` : ""}</p>
                                ${urlLink}
                                ${entry.image_path ? `<img src="${entry.image_path}" alt="${entry.name}" width="200"/>` : ""}
                            </div>`;
                }).join('<hr>');

                // Set up the marker click event to open the modal
                marker.getElement().addEventListener('click', function () {
                    document.getElementById("modal-content-body").innerHTML = buildModalContent;
                    document.getElementById("myModal").style.display = "block";
                });
            });
        })
        .catch(error => console.error("Error loading YAML file:", error));

    // Modal close functionality
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
</script>

