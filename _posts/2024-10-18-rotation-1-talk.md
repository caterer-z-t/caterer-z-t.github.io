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

You can view my rotation talk presentation using the link You can view my rotation talk presentation using the link [Download Rotation Talk Presentation PDF]({{ "/assets/pdf/iq_bio_rotations/zhang_lab/20241018_zhang_lab_rotation_presentation.pdf" | relative_url }})
This rotation project was with the Zhang lab at CU Anschutz. 

<h1>Slides</h1>
<div>
    <figure>
        <a href=
            {% if site.data.slides.slides[0].url contains "://" %}
              "{{ site.data.slides.slides[0].url }}"
            {% else %}
              "{{ site.data.slides.slides[0].url | relative_url }}"
            {% endif %}
            title="{{ site.data.slides.slides[0].title }}"
        >
        <img class="thumb" width="300" src=
          {% if site.data.slides.slides[0].image_path contains "://" %}
            "{{ site.data.slides.slides[0].image_path }}"
          {% else %}
            "{{ site.data.slides.slides[0].image_path | relative_url }}"
          {% endif %}
          alt="{{ site.data.slides.slides[0].title }}">
        </a>
        <figcaption>
        {{ site.data.slides.slides[0].title }}
        </figcaption>
    </figure>
</div>
