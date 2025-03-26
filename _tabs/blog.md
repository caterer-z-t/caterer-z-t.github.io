<!-- ---
layout: page
title: Blog
icon: fa-solid fa-blog
order: 5
---

<div class="blog-posts">
  {% assign sorted_posts = site.blog | sort: 'date' | reverse %}
  {% unless sorted_posts == empty %}
    {% for post in sorted_posts %}
      <div class="blog-post">
        <h3 class="post-title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
        
        {% if forloop.first %}
          <div class="post-excerpt">
            {{ post.content }}
          </div>
        {% elsif forloop.index <= 5 %}
          <div class="post-excerpt">
            {% if post.excerpt %}
              {{ post.excerpt | strip_html | truncatewords: 50 }}
            {% else %}
              {{ post.content | strip_html | truncatewords: 50 }}
            {% endif %}
          </div>
          <a href="{{ post.url | relative_url }}" class="read-more">Read more...</a>
        {% else %}
          <!-- Only show title for posts after the first 5 -->
        {% endif %}
        
        <hr>
      </div>
    {% endfor %}
  {% endunless %}
</div> -->