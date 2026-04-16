// Gallery configuration from Jekyll
const imageFolder = window.galleryConfig.imageFolder;
const imageList = window.galleryConfig.imageList;

// Slideshow functionality
const slideshowImage = document.getElementById('slideshow-image');
let currentIndex = 0;

function showImage(index) {
    slideshowImage.style.opacity = 0;
    setTimeout(() => {
        slideshowImage.src = imageFolder + imageList[index];
        slideshowImage.style.opacity = 1;
    }, 400);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % imageList.length;
    showImage(currentIndex);
}

// Auto-advance slideshow every 4 seconds
showImage(currentIndex);
setInterval(nextImage, 4000);

// Photo grid
const photoGrid = document.getElementById('photo-grid');

imageList.forEach((imageName, index) => {
    const img = document.createElement('img');
    img.src = imageFolder + imageName;
    img.alt = imageName;
    img.classList.add('gallery-image');
    img.addEventListener('click', () => openLightbox(index));
    photoGrid.appendChild(img);
});

// Lightbox
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = imageFolder + imageList[index];
    lightboxOverlay.style.display = 'flex';
}

function closeLightbox() {
    lightboxOverlay.style.display = 'none';
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (lightboxOverlay.style.display === 'flex') {
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imageList.length;
            lightboxImage.src = imageFolder + imageList[currentIndex];
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
            lightboxImage.src = imageFolder + imageList[currentIndex];
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});
