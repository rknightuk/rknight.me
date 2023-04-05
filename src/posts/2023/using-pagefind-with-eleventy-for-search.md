---
title: Using PageFind with Eleventy for Search
permalink: /using-pagefind-with-eleventy-for-search/index.html
date: 2023-01-04
excerpt: "How to use PageFind to implement search for an Eleventy site"
layout: post
---

In the past, I have implemented my own search for static sites and while it's good _enough_, it's not great. Recently [Tweetback](https://github.com/tweetback/tweetback), a self-hosted Twitter archive, added search using [PageFind](https://pagefind.app) so I dug into the code to see how it's done. PageFind is:

> a fully static search library that aims to perform well on large sites, while using as little of your users’ bandwidth as possible, and without hosting any infrastructure

I hadn't even heard of PageFind until a few weeks ago so most of what I've learnt here came from the PageFind docs and the [pull request](https://github.com/tweetback/tweetback/pull/27) that added search to Tweetback so a big thanks to [Alistair](https://alistairshepherd.uk) for writing the PR.

### Installation

Note: I had to change some directories for [the demo](https://github.com/rknightuk/eleventy-pagefind-demo/) to get this to work on GitHub pages but everything works exactly the same as below.

To get started, install [the package](https://www.npmjs.com/package/pagefind) to your Eleventy project. PageFind has [more detailed installation instructions on their website here](https://pagefind.app/docs/installation/).

```bash
npm install --save-dev pagefind
```

### Build the index

PageFind works by scanning a bunch of HTML files and looking for [one of the `data-pagefind` attributes](https://pagefind.app/docs/indexing/).  We'll add the `data-pagefind-body` attribute to the article element that wraps the posts to tell it to index the post content:

```html
<article data-pagefind-body>
    {% raw %}{{ content | safe }}{% endraw %}
</article>
```

We want to run the PageFind CLI _after_ the site has been built so we use the [`after` Eleventy event](https://www.11ty.dev/docs/events/#eleventy.after) and run the command with [`execSync`](https://nodejs.org/api/child_process.html#child_processexecsynccommand-options) on all HTML files in the built site:

```js
const { execSync } = require('child_process')

module.exports = function(eleventyConfig) {
  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --source _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
  })
}
```

**Note**: if you haven’t already, you must install `child_process`: `npm i child_process`. Once you have done that, add the line `const execSync = require('child_process').execSync;` somewhere before the function, in your `.eleventy.js`.

Note the `_site` source option - if your site is built to a different directory then change this. This outputs a `_pagefind` directory to the build folder.

### Add a Search Box

PageFind has [an API](https://pagefind.app/docs/api/) if you want to make your own search interface but for this we'll use the built-in UI. Add the following to wherever you want the search box to appear, in the case of this demo it's going on the home page.

Add the PageFind stylesheet either in the head or above your search box element. The additional styles are optional and only needed if you need a dark theme/mode.

```html
<link href="/_pagefind/pagefind-ui.css" rel="stylesheet">

<style>
  @media (prefers-color-scheme: dark) {
    :root {
      --pagefind-ui-primary: #eeeeee;
      --pagefind-ui-text: #eeeeee;
      --pagefind-ui-background: #152028;
      --pagefind-ui-border: #152028;
      --pagefind-ui-tag: #152028;
    }
  }
</style>
```

PageFind requires an element with an ID which can then be passed to the script.

```html
<div id="search" class="search"></div>

<script src="/_pagefind/pagefind-ui.js" onload="new PagefindUI({ element: '#search', showImages: false });"></script>
```

Run your Eleventy serve script and if everything has worked, you should have a functioning search that searches all your posts:

![Search box with McFly as the search term and three results](https://rknightuk.s3.amazonaws.com/site/pagefind-eleventy.png)
The code for this is [on GitHub](https://github.com/rknightuk/eleventy-pagefind-demo) and there is a [live demo here](https://rknightuk.github.io/eleventy-pagefind-demo).
