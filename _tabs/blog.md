---
layout: page
title: Blog
icon: fa-solid fa-blog
order: 5
---

<div class="blog-posts">
  {% assign sorted_posts = site.blog | sort: 'date' | reverse %}
  {% unless sorted_posts == empty %}
    <div class="blog-post">
      <h3 class="post-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h3>
      <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
      <div class="post-excerpt">
        {% if post.excerpt %}
          {{ post.excerpt }}
        {% else %}
          {{ post.content | strip_html | truncatewords: 50 }}
        {% endif %}
      </div>
      <a href="{{ post.url | relative_url }}" class="read-more">Read more...</a>
    </div>
    <hr>
  {% endfor %}
</div>