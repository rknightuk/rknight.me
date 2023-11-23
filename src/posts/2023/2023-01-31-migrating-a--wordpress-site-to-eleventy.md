---
title: Notes on Migrating a Wordpress Site to Eleventy
permalink: /note-on-migrating-wordpress-site-eleventy/index.html
date: 2023-01-31T22:13:16.196Z
excerpt: "Some helpful notes and tools for migrating an existing Wordpress site to Eleventy"
layout: post
tags:
  - Eleventy
  - Development
---

I recently helped my friend Tim move [his site](https://nahumck.me/) from a Wordpress install to a much simpler Eleventy setup. The biggest hurdle was transforming the Wordpress exported data into Markdown files. Thankfully [`wordpress-export-to-markdown`](https://github.com/lonekorean/wordpress-export-to-markdown) exists. This is a command line tool that takes a wordpress export, puts all the posts in markdown files, and downloads all the images contained in the posts.

I did make an adjustment to this script so I could add a `permalink` attribute to each post by editing the `parser.js` file:

```diff
frontmatter: {
    title: getPostTitle(post),
+   permalink: `${getPostSlug(post)}/index.html`,
    date: getPostDate(post),
    categories: getCategories(post),
    tags: getTags(post)
}
```

The image download will take a while but once it was done I had all the posts and all the images ready to pop into an Eleventy site.

To match Tim's existing site it needed support for markdown footnotes and image captions. As a side note here, footnotes _do not_ export well from Wordpress via the CLI tool so I had to manually fix all of them which was not fun. [Al Power](https://www.alpower.com/) had an article for both of these features which was handy. To add footnote support I followed the steps in [this article](https://www.alpower.com/tutorials/configuring-footnotes-with-eleventy/) which outlines how to include `markdown-it-footnote` for the markdown parsing and [this article](https://www.alpower.com/tutorials/adding-figures-with-captions-to-images-in-markdown-with-eleventy/) to add image captions.

All in all it went fairly smoothly - without `wordpress-export-to-markdown` I would have had to write my own parsing script which I'm very glad I didn't have to do.
