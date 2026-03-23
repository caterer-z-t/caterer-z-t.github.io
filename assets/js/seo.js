function injectPersonSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Zach Caterer",
        "url": "https://caterer-z-t.github.io",
        "affiliation": {
            "@type": "Organization",
            "name": "University of Colorado Boulder"
        },
        "description": "PhD student working in computational biology, genomics, and machine learning."
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);

    document.head.appendChild(script);
}

injectPersonSchema();