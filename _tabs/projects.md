---
layout: page
title: Projects
icon: fa-regular fa-lightbulb
order: 4
---

<h1>Projects</h1>
<div>
    {% for deck in site.data.projects.projects %}
    <figure>
        <a href=
          {% if deck.url contains "://" %}
            "{{ deck.url }}"
          {% else %}
            "{{ deck.url | relative_url }}"
          {% endif %}
        title="{{ deck.title }}">
        <img class="thumb" width="300" src=
          {% if deck.image_path contains "://" %}
            "{{ deck.image_path }}"
          {% else %}
            "{{ deck.image_path | relative_url }}"
          {% endif %}
          alt="{{ deck.title }}">
        </a>
        <figcaption>
        {{ deck.title }}
        </figcaption>
    </figure>
    {% endfor %}
</div>
