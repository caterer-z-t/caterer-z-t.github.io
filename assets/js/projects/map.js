// Initialize the map centered on the US
const map = L.map('map').setView([39.5, -98.35], 4);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);
fetch('_data/projects.yml')
    .then(response => response.text())
    .then(yamlText => {
        const data = jsyaml.load(yamlText); // Parse YAML to JavaScript object

        // Loop through each location
        data.locations.forEach(location => {
            const { city, lat, lon, entries } = location;

            // Create a marker for the location
            const marker = L.marker([lat, lon]).addTo(map);

            // Update the marker click event to show a modal with all project details
            marker.on('click', function () {
                let modalContent = ''; // Initialize the modal content variable
                entries.forEach(entry => {
                    modalContent += `<b>${entry.name}</b><br>`;
                    modalContent += entry.date ? `${entry.date} - ${entry.type}<br>` : '';
                    modalContent += entry.affiliation ? `${entry.affiliation}<br>` : ''; // Include affiliation in modal
                    modalContent += entry.url ? `<a href="${entry.url}" target="_blank">View project</a><br>` : '';
                    modalContent += entry.image_path ? `<img src="${entry.image_path}" alt="${entry.name}" style="width:100px;height:auto;"><br>` : '';
                    modalContent += `<br>`; // Add space between entries
                });

                // Pass the generated content to the modal function
                showModal(modalContent);
            });
        });
    })
    .catch(error => console.error('Error loading the map data:', error));

// Function to show modal with content
function showModal(projectDetails) {
    // Prevent any existing open Leaflet popups
    map.closePopup();

    // Populate the modal content dynamically
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = projectDetails; // Inject the dynamically generated content

    // Show the modal using Bootstrap's modal functionality
    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
}
