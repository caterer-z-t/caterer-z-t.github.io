---
title: Teaching, and Tutoring
permalink: /teaching/
layout: home
classes: wide
header:
    overlay_color: "#000"
    overlay_filter: "0.2"
    overlay_image: assets/images/uwec/uwec_arch_distance.jpeg
---
{% for category in site.data.teaching.categories %}
  <h2>{{category.heading}}</h2>
  <ol>
  {% for course in category.courses %}
    <li><strong>{{course.title}}</strong>.
    <br>
    <em>{{course.term}}</em><br>
    {% if course.url %}
      [<a href="{{course.url}}">{{course.urltitle}}</a>]
    {% endif %}
    </li>
  {% endfor %}
  </ol>
{% endfor %}