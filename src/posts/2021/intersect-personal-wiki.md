---
title: "The Intersect: My Personal Wiki"
permalink: /intersect/index.html
date: 2021-08-23
excerpt: "Intersect is a personal wiki built with Eleventy"
layout: post
tags:
    - Development
    - Eleventy
---

I came across [Nikita Volodoev's wiki](https://wiki.nikitavoloboev.xyz/) recently when looking for other things and realised this was exactly the type of things I'd been looking for to store snippets, links, and other notes about various things that don't justify a full blog post. And because I'm an idiot I ended up [building my own solution](https://hellsite.rknight.me/1426307649365286921) with [Eleventy](https://11ty.dev). The result is [Intersect](https://intersect.rknight.me).

Aside from just rendering a bunch of markdown files it has a number of additional features.

- Table of contents and breadcrumbs
- Syntax highlight for code blocks with copy code button
- Full search of content and links
- Highlight search queries on navigation to a result
- Popular pages using the [Fathom API](https://usefathom.com/ref/IXCLSF)
- Recently updated pages by parsing the git log

There are a bunch of pages where you can read about what Intersect is and how it works on Intersect itself:

- [The introduction page](https://intersect.rknight.me) has some more details about the why
- [The meta page](https://intersect.rknight.me/meta) sets out what the purpose of the site is
- [The readme page](https://intersect.rknight.me/meta/readme) has installation instructions, and more technical information about how it was built

The [source code is on GitHub](https://github.com/rknightuk/intersect) but to paraphrase [Andy Bell](https://github.com/andy-piccalilli/11ty-base) it's not open source so much as it is free. I doubt this will meet the requirements of anyone else, it's a good base to start with, but any features I add will be because I want them.

There is a companion [Alfred workflow](https://github.com/rknightuk/alfred-workflows/tree/main/workflows/intersect) that also searches the content and links and can also open the page in VSCode for editing.

I even went full [#devsdodesign](http://devsdodesign.com) and made a logo:

![Intersect Logo](https://rknightuk.s3.us-east-1.amazonaws.com/site/intersect-logo.png)