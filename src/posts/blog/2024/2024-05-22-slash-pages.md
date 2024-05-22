---
title: "Slash Pages"
permalink: /blog/slash-pages/index.html
date: 2024-05-22T20:21:10.913Z
excerpt: "A website I made as a guide to common pages you can add to your website"
layout: post
tags:
    - Development
    - OpenWeb
    - WeblogPoMo
---

![Slash pages](https://cdn.rknight.me/site/slashpages.jpg)

Don't care about the backstory? [Go check out slashpages.net](https://slashpages.net).

While putting Baby Knight to bed I had an idea for a project: a website that acts as a guide to the different slash pages you can add to you website.

"Slash pages" is a phrase coined by [Shellsharks](https://shellsharks.com) when I called pages like `/uses` "sitelets", which is _not_ a good name. They also helped me come up with a good description:

> Slash pages are common pages you can add to your website, usually with a standard, root-level slug like /now, /about, or /uses. They tend to describe the individual behind the site and are distinguishing characteristics of the IndieWeb.

I managed to snag a decent domain[^1] for it and to put the site together I of course used [Eleventy](https://11ty.dev). Create a collection of the slash pages, render them out on the home page. Easy peasy.

I was able to use some new CSS I've not used before including `wavy` text decoration and [`::first-letter`](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter). The caveat with the latter is the "first letter" also includes any punctuation. So `/u` will both be styled in an element with the contents of `/uses`. To get around this I added an empty span, which causes `::first-letter` to only highlight the `/`:

```html
<style>
    p { color: #cd064d; }
    p::first-letter { color: #ccc; }
</style>

<p class="first-letter">
    /<span></span>uses
</p>
```

The source code of the site is [on GitHub](https://github.com/rknightuk/slashpages) and you can see it in all it's glory at [slashpages.net](https://slashpages.net).

[^1]: I wanted slash.page but that was sadly already taken