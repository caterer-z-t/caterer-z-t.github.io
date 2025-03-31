document.addEventListener("DOMContentLoaded", function () {
    const lightbulbIcon = document.querySelector(".lightbulb-icon");
    const moonIcon = document.querySelector(".moon-icon");
    const mobileLightBulbIcon = document.querySelector(".mobile-lightbulb-icon");
    const mobileMoonIcon = document.querySelector(".mobile-moon-icon");
    const sidebarLightbulbIcon = document.querySelector(".sidebar-lightbulb-icon");
    const sidebarMoonIcon = document.querySelector(".sidebar-moon-icon");
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Function to apply theme and toggle icon visibility
    function applyTheme(theme) {
        if (theme === "light") {
            body.classList.add("light-mode");
            body.classList.remove("dark-mode");

            // Show the lightbulb icon and hide the moon icon for light mode
            lightbulbIcon.style.display = "inline-block";
            mobileLightBulbIcon.style.display = "inline-block";
            sidebarLightbulbIcon.style.display = "inline-block";

            moonIcon.style.display = "none";
            mobileMoonIcon.style.display = "none";
            sidebarMoonIcon.style.display = "none";
        } else {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");

            // Show the moon icon and hide the lightbulb icon for dark mode
            lightbulbIcon.style.display = "none";
            mobileLightBulbIcon.style.display = "none";
            sidebarLightbulbIcon.style.display = "none";

            moonIcon.style.display = "inline-block";
            mobileMoonIcon.style.display = "inline-block";
            sidebarMoonIcon.style.display = "inline-block";
        }
        localStorage.setItem("theme", theme); // Store theme in localStorage
    }

    // Load theme from localStorage (fallback to 'dark' theme if none is stored)
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);

    // Toggle between themes when clicking on any icon or button
    function toggleTheme() {
        const newTheme = body.classList.contains("light-mode") ? "dark" : "light";
        applyTheme(newTheme);
    }

    // Add event listeners for theme toggles
    if (lightbulbIcon) lightbulbIcon.addEventListener("click", toggleTheme);
    if (moonIcon) moonIcon.addEventListener("click", toggleTheme);
    if (toggleButton) toggleButton.addEventListener("click", toggleTheme);
    if (mobileLightBulbIcon) mobileLightBulbIcon.addEventListener("click", toggleTheme);
    if (mobileMoonIcon) mobileMoonIcon.addEventListener("click", toggleTheme);
    if (sidebarLightbulbIcon) sidebarLightbulbIcon.addEventListener("click", toggleTheme);
    if (sidebarMoonIcon) sidebarMoonIcon.addEventListener("click", toggleTheme);
});

document.addEventListener("DOMContentLoaded", function () {
    const mainFooter = document.getElementById('footer');
    const sidebarFooter = document.getElementById('footer-sidebar');

    function checkFooterVisibility() {
        const footerRect = mainFooter.getBoundingClientRect();
        const isFooterVisible = footerRect.top <= window.innerHeight && footerRect.bottom >= 0;

        if (isFooterVisible) {
            sidebarFooter.style.display = 'none';  // Hide sidebar footer when main footer is visible
        } else {
            sidebarFooter.style.display = 'block'; // Show sidebar footer when main footer is NOT visible
        }
    }

    // Run check when user scrolls
    window.addEventListener('scroll', checkFooterVisibility);
    // Run check on initial load in case footer is already in view
    checkFooterVisibility();
});
