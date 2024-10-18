---
title: IQ Biology Zhang Lab Rotation Talk
date: 2024-10-18 09:00:00
tag: [UCB]
categories: [Graduate School]
author: <zc>    
image: 
    path: ../assets/pdf/iq_bio_rotations/zhang_lab/20241018_zhang_lab_rotation_presentation.png
    alt: Zhang Lab Rotation Presentation
---

### Rotation Talk Presentation

This rotation project was with the Zhang lab at University of Colorado Anschutz, and the Biofrontiers Institute at University of Colorado Boulder. 

<h1>Slides</h1>
<div>
    {% for deck in site.data.slides.slides %}
    <figure>
        <a href=
            {% if deck.url contains "://" %}
              "{{ deck.url }}"
            {% else %}
              "{{ deck.url | relative_url }}"
            {% endif %}
            title="{{ deck.title }}"
        >
        <img class="thumb" width="600" src=
          {% if deck.image_path contains "://" %}
            "{{ deck.image_path }}"
          {% else %}
            "{{ deck.image_path | relative_url }}"
          {% endif %}
          alt="{{ deck.title }}">
        </a>
        <figcaption>
        {{deck.title}}
        </figcaption>
    </figure>
    {% endfor %}
</div>

<h1>Recordings</h1>
<div>
    {% for deck in site.data.slides.recordings %}
    <figure>
        <a href=
            {% if deck.url contains "://" %}
              "{{ deck.url }}"
            {% else %}
              "{{ deck.url | relative_url }}"
            {% endif %}
            title="{{ deck.title }}"
        >
        <img class="thumb" width="300" src=
          {% if deck.image_path contains "://" %}
            "{{ deck.image_path }}"
          {% else %}
            "{{ deck.image_path | relative_url }}"
          {% endif %}
          alt="{{ deck.title }}">
        </a>
        <figcaption>
        {{deck.title}}
        </figcaption>
    </figure>
    {% endfor %}
</div>