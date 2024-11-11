Personal website for Zachary Caterer

Project directory

``` bash 
|-- _data/                       # Data folder for holding .json or .yml files
|   |-- webweb.json            # This should contain your data for webweb_json
|   |-- authors.yml
|   |-- contact.yml
|   |-- papers.yml
|   |-- people.yml
|   |-- projects.yml
|   |-- share.yml
|-- _includes/                   # Partial templates that can be included in pages
|   |-- projects.html
|   |-- webweb.html              # Your webweb visualization partial (what you shared above)
|-- _plugins/
|   |-- posts-lastmod-hook.rb
|-- _posts/                    # Default layout templates
|   |-- 2001-09-06.md
|   |-- 2019-08-04.md
|   |-- 2024-05-17.md
|-- _tabs/                      # Blog posts if needed
|   |-- about.md                   # file containing the webweb visualization
|   |-- archives.md
|   |-- categories.md
|   |-- cv.md
|   |-- koda.md
|   |-- tags.md
|-- assets/                      # Folder for static assets
|   |-- css/                     # CSS files
|   |   |-- projects/
|   |   |   |-- style.css
|   |   |-- webweb/
|   |   |   |-- style.css        # Webweb specific styles
|   |-- js/                      # JS files
|   |   |-- projects/
|   |   |   |-- map.js
|   |   |-- webweb/              # Folder for webweb JS assets
|   |   |   |-- webweb.bundle.js # Main webweb JavaScript file
|-- index.html
|-- _config.yml
|-- .editorconfig
|-- .gitattributes
|-- .gitignore
|-- .gitmodules
|-- Gemfiles
|-- README.md
|-- web.py
```