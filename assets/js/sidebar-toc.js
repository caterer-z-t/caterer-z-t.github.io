document.addEventListener('DOMContentLoaded', function () {
    const tocList = document.getElementById('toc-list');
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const categoriesList = document.getElementById('toc-categories'); // Assuming a container for categories
    const tagsList = document.getElementById('toc-tags'); // Assuming a container for tags

    // Generate TOC for headers
    headers.forEach((header, index) => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        const headerText = header.innerText;
        const anchorId = header.innerText.replace(/\s+/g, '-'); // Replace spaces with dash to form the ID

        // Add ID to header for linking
        header.id = anchorId;

        // Set anchor link
        anchor.href = `#${anchorId}`;
        anchor.innerText = headerText;

        listItem.appendChild(anchor);
        tocList.appendChild(listItem);
    });

    // Add categories to TOC (assuming each post has categories)
    const categories = [...new Set([...document.querySelectorAll('[data-category]')].map(element => element.dataset.category))];
    categories.forEach(category => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = `${window.location.origin}/categories/#${category.replace(/\s+/g, '-')}`; // Replace spaces with dash
        anchor.innerText = category;
        listItem.appendChild(anchor);
        categoriesList.appendChild(listItem);
    });

    // Add tags to TOC (assuming each post has tags)
    const tags = [...new Set([...document.querySelectorAll('[data-tag]')].map(element => element.dataset.tag))];
    tags.forEach(tag => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = `${window.location.origin}/tags/#${tag.replace(/\s+/g, '-')}`; // Replace spaces with dash
        anchor.innerText = tag;
        listItem.appendChild(anchor);
        tagsList.appendChild(listItem);
    });
});

// Toggle sidebar visibility
document.getElementById('toggle-toc').addEventListener('click', function () {
    const tocSidebar = document.getElementById('toc-sidebar');
    tocSidebar.classList.toggle('show');
});
