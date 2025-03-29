document.addEventListener("DOMContentLoaded", function () {
    const lightbulbIcon = document.querySelector(".lightbulb-icon");
    const moonIcon = document.querySelector(".moon-icon");
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    function applyTheme(theme) {
        if (theme === "light") {
            body.classList.add("light-mode");
            body.classList.remove("dark-mode");
            lightbulbIcon.style.display = "none";
            moonIcon.style.display = "inline-block";
        } else {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
            lightbulbIcon.style.display = "inline-block";
            moonIcon.style.display = "none";
        }
        localStorage.setItem("theme", theme);
    }

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);

    function toggleTheme() {
        const newTheme = body.classList.contains("light-mode") ? "dark" : "light";
        applyTheme(newTheme);
    }

    if (lightbulbIcon) lightbulbIcon.addEventListener("click", toggleTheme);
    if (moonIcon) moonIcon.addEventListener("click", toggleTheme);
    if (toggleButton) toggleButton.addEventListener("click", toggleTheme);
});
