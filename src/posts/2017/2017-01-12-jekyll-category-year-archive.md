---
title: Jekyll Post Archive Grouped by Year
permalink: /jekyll-category-year-archive/index.html
layout: post
excerpt: "Code Snippet for creating a post archive grouped by year in Jekyll"
date: 2017-01-12
tags:
    - Development
---

```html
{% raw  %}
    <!-- Check if the date has been output -->
    {% assign datePrinted = false %}
    <!-- Assign year to something we're not using -->
    {% assign currentYear = 1000 %}
    <!-- Get number of posts -->
    {% assign postCount = archivePosts | size %}
    
    <!-- If no posts, say that -->
    {% if postCount == 0 %}
        <p>No posts yet</p>
    {% endif %}

    <!--  Loop thrugh posts -->
    {% for post in archivePosts %}

        {% assign postYear = post.date | date: "%Y" %}

        <!-- Output posts if this is a new year -->
        {% unless postYear == currentYear %}
            <h2>{{ postYear }}</h2>
        {% endunless %}

        {% assign currentYear = postYear %}

        <!-- Output post -->
        <p>
            {{ post.date | date: "%d/%m" }} - 
            <a href="{{ post.url }}">
                {{ post.title }}
            </a>
        </p>
        
    {% endfor %}
{% endraw %}
```