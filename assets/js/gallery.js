// Gallery configuration from Jekyll
const imageFolder = window.galleryConfig.imageFolder;
const imageList = window.galleryConfig.imageList;

const slideshowDelay = 4000; // 4 seconds per image
let photos = []; // Will be populated after sorting

// --- Extract EXIF date and sort images ---
async function loadAndSortImages() {
    const imagePromises = imageList.map(async (name) => {
        const url = imageFolder + name;
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Enable CORS if needed
            img.onload = function () {
                EXIF.getData(img, function () {
                    // Try to get original date taken
                    let dateStr = EXIF.getTag(this, "DateTimeOriginal") ||
                        EXIF.getTag(this, "DateTime") ||
                        EXIF.getTag(this, "DateTimeDigitized");

                    let timestamp = Date.now(); // Default to now if no EXIF

                    if (dateStr) {
                        // EXIF date format: "YYYY:MM:DD HH:MM:SS"
                        const parts = dateStr.split(' ');
                        const datePart = parts[0].replace(/:/g, '-');
                        const timePart = parts[1] || '00:00:00';
                        timestamp = new Date(datePart + 'T' + timePart).getTime();
                    }

                    resolve({ url, name, timestamp });
                });
            };
            img.onerror = function () {
                // If image fails to load, still include it with current time
                resolve({ url, name, timestamp: Date.now() });
            };
            img.src = url;
        });
    });

    const imageData = await Promise.all(imagePromises);

    // Sort by timestamp (newest first)
    imageData.sort((a, b) => b.timestamp - a.timestamp);

    // Extract sorted URLs
    photos = imageData.map(img => img.url);

    // Initialize slideshow and gallery after sorting
    initSlideshow();
    buildGalleryGrid();
}

// --- Slideshow ---
function initSlideshow() {
    if (photos.length === 0) return;
    let index = 0;
    const imgEl = document.getElementById("slideshow-image");

    function showNext() {
        const nextIndex = (index + 1) % photos.length;
        const tempImg = new Image();
        tempImg.src = photos[nextIndex];
        tempImg.onload = () => {
            imgEl.src = photos[nextIndex];
            imgEl.style.opacity = 1;
            index = nextIndex;
        };
        imgEl.style.opacity = 0;
    }

    // show first image
    const firstImg = new Image();
    firstImg.src = photos[0];
    firstImg.onload = () => {
        imgEl.src = photos[0];
        imgEl.style.opacity = 1;
    };

    setInterval(showNext, slideshowDelay);
}

// --- Gallery Grid ---
function buildGalleryGrid() {
    const grid = document.getElementById("photo-grid");
    photos.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        img.className = "gallery-image";
        img.addEventListener("click", () => openLightbox(url));
        grid.appendChild(img);
    });
}

// --- Lightbox ---
function openLightbox(url) {
    const overlay = document.getElementById("lightbox-overlay");
    const img = document.getElementById("lightbox-image");
    overlay.style.display = "flex";
    img.src = url;
}

function closeLightbox() {
    document.getElementById("lightbox-overlay").style.display = "none";
}

document.getElementById("lightbox-overlay").addEventListener("click", e => {
    if (e.target.id === "lightbox-overlay" || e.target.id === "lightbox-close") {
        closeLightbox();
    }
});

// --- Init ---
loadAndSortImages();