---
title: Millennium Falcon 3D Model
date: 2024-10-15 04:00:00
tag: [Life]
categories: [Life]
author: <zc>
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="{{ '/assets/js/public/index.css' | relative_url }}">
  <script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@v0.163.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@v0.163.0/examples/jsm/"
      }
    }
  </script>
</head>
<body>
  <div id="heading">
    <h1>THE MILLENNIUM FALCON</h1>
    <div class="border"></div>
  </div>
  <div id="progress-container">
    <div id="progress">Engaging Hyperdrive...</div>
  </div>

  <script type="module" src="{{ '/assets/js/main.js' | relative_url }}"></script>
</body>
</html>
