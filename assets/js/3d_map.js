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

fetch('/_data/projects.yml')
    .then(response => response.text())
    .then(yamlText => {
        const locationsFromYaml = jsyaml.load(yamlText);

        locationsFromYaml.locations.forEach(location => {
            const marker = new mapboxgl.Marker()
                .setLngLat([location.lon, location.lat])
                .addTo(map);

            const buildModalContent = location.entries.map(entry => {
                let urlLink = '';
                if (entry.url) {
                    urlLink = `<p><a href="${entry.url}" target="_blank">More Info</a></p>`;
                }

                return `<div>
                            <h3>${entry.name}</h3>
                            <p><strong>${entry.affiliation ? `Affiliation: ${entry.affiliation}` : ""}</strong></p>
                            <p>${entry.date ? `<em>Date: ${entry.date}</em>` : ""}</p>
                            ${urlLink}
                            ${entry.image_path ? `<img src="${entry.image_path}" alt="${entry.name}" width="200"/>` : ""}
                        </div>`;
            }).join('<hr>');

            marker.getElement().addEventListener('click', function () {
                document.getElementById("modal-content-body").innerHTML = buildModalContent;
                document.getElementById("myModal").style.display = "block";
            });
        });
    })
    .catch(error => console.error("Error loading YAML file:", error));

// Modal logic
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var closeButton = document.getElementById("closeButton");

// Close modal when the '×' span is clicked
span.onclick = function () {
    modal.style.display = "none";
}

// Close modal when the 'Close' button is clicked
closeButton.onclick = function () {
    modal.style.display = "none";
}

// Close modal if the user clicks anywhere outside the modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
