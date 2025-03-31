document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".side-navbar");
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > header.offsetHeight) {
            sidebar.classList.add("show");
        } else {
            sidebar.classList.remove("show");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("side-menu");
    const menuToggle = document.getElementById("menu-toggle");
    const hiddenNav = document.getElementById("hidden-nav");
    const headerNavbar = document.querySelector('.header-navbar-toggle');
    const closeIcon = document.getElementById("close-icon");
    const header = document.querySelector("header");

    let isMenuOpen = false;

    // Function to check scroll and window width for showing the menu
    function checkScroll() {
        const windowWidth = window.innerWidth;
        const minSize = 973;
        const maxSize = 1599;

        if (windowWidth >= minSize && windowWidth <= maxSize) {
            headerNavbar.style.display = window.scrollY > header.offsetHeight ? "block" : "none";
        } else {
            headerNavbar.style.display = windowWidth < minSize ? "block" : "none";
        }
    }

    // Function to adjust navbar display based on window size
    function adjustNavbars() {
        const windowWidth = window.innerWidth;
        const headerNavbarElements = document.getElementsByClassName("top-navbar");

        if (windowWidth < 972) {
            Array.from(headerNavbarElements).forEach(el => el.style.display = "none");
            headerNavbar.style.display = "block";
        } else {
            Array.from(headerNavbarElements).forEach(el => el.style.display = "block");
            headerNavbar.style.display = "none";
        }
    }

    // Function to toggle the menu (open/close)
    function toggleMenu(e) {
        // Prevent the default anchor behavior
        e.preventDefault();

        isMenuOpen = true;
        sidebar.classList.add("expanded");

        // Show the hidden menu and hide the toggle button
        hiddenNav.style.display = "block";
        headerNavbar.style.display = "none";
    }

    // Function to close the menu
    function closeMenu(e) {
        // Prevent the default anchor behavior
        e.preventDefault();

        isMenuOpen = false;
        sidebar.classList.remove("expanded");

        // Hide the hidden menu and show the toggle button
        hiddenNav.style.display = "none";
        headerNavbar.style.display = "block";
    }

    // Function to show sidebar when scrolling past the header
    window.addEventListener("scroll", function () {
        if (window.scrollY > header.offsetHeight) {
            sidebar.classList.add("show");
        } else {
            sidebar.classList.remove("show");
        }
        checkScroll();
    });

    // Event listeners
    menuToggle.addEventListener("click", function (e) {
        // We need to find the anchor inside the menu toggle and prevent its default behavior
        e.preventDefault();
        toggleMenu(e);
    });

    // Add event listener to the close icon
    if (closeIcon) {
        closeIcon.parentElement.addEventListener("click", closeMenu);
    }

    window.addEventListener("resize", () => {
        adjustNavbars();
        checkScroll();
    });

    // Initial checks on page load
    adjustNavbars();
    checkScroll();
});

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".header-navbar-toggle");

    if (navbar) {
        function adjustBodyPadding() {
            document.body.style.paddingTop = `${navbar.offsetHeight}px`;
        }

        // Adjust padding when the page loads
        adjustBodyPadding();

        // Adjust padding when the window is resized
        window.addEventListener("resize", adjustBodyPadding);
    }
});
