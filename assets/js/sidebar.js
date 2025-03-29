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
