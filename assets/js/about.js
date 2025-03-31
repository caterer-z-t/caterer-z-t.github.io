document.addEventListener("DOMContentLoaded", function () {
    function updateLayout() {
        const container = document.getElementById("about-container");
        const imageContent = document.getElementById("image-content");
        const textContent = document.getElementById("text-content");

        if (window.innerWidth <= 768) {
            container.style.flexDirection = 'column';
            textContent.style.order = '1';
            imageContent.style.order = '0';
        } else {
            container.style.flexDirection = 'row';
            textContent.style.order = '0';
            imageContent.style.order = '1';
        }
    }

    // Run on page load
    updateLayout();

    // Run on window resize
    window.addEventListener('resize', updateLayout);
});

document.addEventListener("DOMContentLoaded", function () {
    function updateLayout() {
        const container = document.getElementById("research-container");
        const imageContent = document.getElementById("image-content");
        const textContent = document.getElementById("text-content");

        if (window.innerWidth <= 768) {
            container.style.flexDirection = 'column';
            textContent.style.order = '1';
            imageContent.style.order = '0';
        } else {
            container.style.flexDirection = 'row';
            textContent.style.order = '0';
            imageContent.style.order = '1';
        }
    }

    updateLayout();
    window.addEventListener('resize', updateLayout);
});


document.addEventListener("DOMContentLoaded", function () {
    function updateUndergradLayout() {
        const container = document.getElementById("undergrad-container");
        if (!container) return;

        const textContent = container.querySelector(".text-content");
        const imageContent = container.querySelector(".image-content");

        if (window.innerWidth <= 768) {
            container.style.flexDirection = 'column';
            textContent.style.order = '1';
            imageContent.style.order = '0';
        } else {
            container.style.flexDirection = 'row';
            textContent.style.order = '0';
            imageContent.style.order = '1';
        }
    }

    updateUndergradLayout();
    window.addEventListener('resize', updateUndergradLayout);
});

document.addEventListener("DOMContentLoaded", function () {
    function updateUndergradLayout() {
        const container = document.getElementById("wheeler-container");
        if (!container) return;

        const textContent = container.querySelector(".text-content");
        const imageContent = container.querySelector(".image-content");

        if (window.innerWidth <= 768) {
            container.style.flexDirection = 'column';
            textContent.style.order = '1';
            imageContent.style.order = '0';
        } else {
            container.style.flexDirection = 'row';
            textContent.style.order = '0';
            imageContent.style.order = '1';
        }
    }

    updateUndergradLayout();
    window.addEventListener('resize', updateUndergradLayout);
});

document.addEventListener("DOMContentLoaded", function () {
    function updateUndergradLayout() {
        const container = document.getElementById("gomes-container");
        if (!container) return;

        const textContent = container.querySelector(".text-content");
        const imageContent = container.querySelector(".image-content");

        if (window.innerWidth <= 768) {
            container.style.flexDirection = 'column';
            textContent.style.order = '1';
            imageContent.style.order = '0';
        } else {
            container.style.flexDirection = 'row';
            textContent.style.order = '0';
            imageContent.style.order = '1';
        }
    }

    updateUndergradLayout();
    window.addEventListener('resize', updateUndergradLayout);
});

document.addEventListener("DOMContentLoaded", function () {
    function updateUndergradLayout() {
        const container = document.getElementById("Kamariza-container");
        if (!container) return;

        const textContent = container.querySelector(".text-content");
        const imageContent = container.querySelector(".image-content");

        if (window.innerWidth <= 768) {
            container.style.flexDirection = 'column';
            textContent.style.order = '1';
            imageContent.style.order = '0';
        } else {
            container.style.flexDirection = 'row';
            textContent.style.order = '0';
            imageContent.style.order = '1';
        }
    }

    updateUndergradLayout();
    window.addEventListener('resize', updateUndergradLayout);
});

document.addEventListener("DOMContentLoaded", function () {
    function updateUndergradLayout() {
        const container = document.getElementById("walsh-container");
        if (!container) return;

        const textContent = container.querySelector(".text-content");
        const imageContent = container.querySelector(".image-content");

        if (window.innerWidth <= 768) {
            container.style.flexDirection = 'column';
            textContent.style.order = '1';
            imageContent.style.order = '0';
        } else {
            container.style.flexDirection = 'row';
            textContent.style.order = '0';
            imageContent.style.order = '1';
        }
    }

    updateUndergradLayout();
    window.addEventListener('resize', updateUndergradLayout);
});