---
title: Colophon
subtitle: "\"_a statement at the end of a book, typically with a printer's emblem, giving information about its authorship and printing_\""
permalink: /about/colophon/index.html
layout: base
eleventyNavigation:
  key: Colophon
  parent: About
---

This website is built with [Eleventy](https://www.11ty.dev/), a static site generator, and hosted on [Hetzner](https://www.hetzner.com/). The source code is available on [GitHub](https://github.com/rknightuk/rknightuk.me). I deploy this, and most of my [projects](/projects), with [Laravel Forge](https://forge.laravel.com/) to the Hetzner server. Some static sites I host with [Netlify](https://www.netlify.com/). Images for blog posts are stored on [Amazon S3](https://aws.amazon.com/s3/).

I have used [Hexo](https://hexo.io/index.html) and [Jekyll](https://jekyllrb.com/) for [previous versions](/log/versions) of this site.

The site uses HTML, CSS, and a tiny bit of non-essential JS. All types of posts have RSS, Atom, and JSON feeds available from the [subscribe](/subscribe) page. The site supports a subset of [`h-card` microformat properties](https://microformats.org/wiki/h-card#Properties) including author details and post details ([example](https://indiewebify.me/validate-h-card/?url=https%3A%2F%2Frknight.me)).

For any posts on my main blog, I manually post those to my [Mastodon account](https://social.lol/@robb). Other types of posts, like [links](/links), are posted to Mastodon using [Echo](https://echo.rknight.me/), a tool I built.

I fetch webmentions and Mastodon comments about my blog posts with [webmention.io](https://webmention.io) and [Bridgy](https://brid.gy). I wrote about how I did it [in this post](https://rknight.me/blog/adding-webmentions-to-your-site/).

I send webmentions for my posts with the command line version of [webmention.app](https://webmention.app).