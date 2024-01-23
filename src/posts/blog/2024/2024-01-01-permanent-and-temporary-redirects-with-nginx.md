---
title: Creating Permanent and Temporary Redirects with Nginx
permalink: /blog/creating-permanent-and-temporary-redirects-with-nginx/index.html
date: 2024-01-01T13:16:10.649Z
excerpt: "How to create redirects in Nginx"
layout: post
tags:
    - Development
---

As part of a change to move my blog posts from `/slug-of-post` to `/blog/slug-of-post` I needed to set permanent redirects in my Nginx config so the old post links wouldn't 404. [Forge](https://forge.laravel.com) has a UI for this but it only allows doing one redirect at a time and I had ~130 to do. So I grabbed a list of all my post slugs and formatted them with multi-line edit in Sublime Text[^1].

Add the following to your Nginx config to do a redirect for a specific URL. In my case, this lives at `/etc/nginx/sites-available/rknight.me`.

```nginx
server {
    # 301 Moved Permanently
    rewrite ^/slug-of-post /blog/slug-of-post permanent;

    # 302 Found/Moved Temporarily
    rewrite ^/slug-of-post /blog/slug-of-post redirect;

    # the rest of your nginx config here
}
```

You can also do this for a whole domain. Although I didn't need to do this, it's worth noting here as well.

```nginx
server {
    # redirect the root of the domain
    rewrite ^/$ http://new.example.com permanent;

    # preserve paths
    rewrite ^/(.*)$ http://new.example.com/$1 permanent;

    # the rest of your nginx config here
}
```

[^1]: I use VSCode for most things, but Sublime is still the best at handling multi-line editing