// Function to open the modal
function openModal(imageSrc, title, description) {
    const modal = document.querySelector('.image-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');

    // Set content for the modal
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    // modalDescription.textContent = description;

    // Show the modal
    modal.classList.add('show');

    // Add event listener for closing the modal when clicking the close button
    modal.querySelector('.close').addEventListener('click', closeModal);

    // Add event listener for closing the modal when clicking outside of the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Function to close the modal
function closeModal() {
    const modal = document.querySelector('.image-modal');
    modal.classList.remove('show');
}
