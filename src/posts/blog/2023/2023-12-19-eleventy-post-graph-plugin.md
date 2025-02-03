---
title: Eleventy Post Graph Plugin
permalink: /blog/eleventy-post-graph-plugin/index.html
date: 2023-12-19T15:10:02.341Z
excerpt: "Generate Github-style post distribution graph for your blog posts in Eleventy"
tags:
    - Development
    - Eleventy
project: https://postgraph.rknight.me
---

Last week I [tooted about my Github-style post graph](https://social.lol/@robb/111586346073402453) on [my stats page](/blog/stats) and people seemed to like it. [James](https://jamesdoc.com/blog/) added one to his blog pages. [Pete swore at me](https://social.lol/@pimoore/111586392676224177). I knew I had to make it into an Eleventy plugin so other people could us it easily.

![Screenshot of eleventy-plugin-post-graph](https://cdn.rknight.me/site/eleventy-plugin-post-graph-screenshot.png)

If you just want to jump straight into using it, [check out the docs here](https://postgraph.rknight.me). 

To create the data, which days have posts, and the grid itself I'm using `moment.js` to manipulate post dates[^1] and generate an object that looks something like this:

```js
const postMap = {
    years: {
        2023: {
            days: 365,
            offset: 6
        }
    },
    counts: {
        '2023-1': 1,
        '2023-5': 3,
        // and so on
    },
}
```

`days` is the number of days in the year and `offset` is used to start the grid on the correct day; if the 1st of January is a Sunday, the offset is 6. The keys in `counts` are the year plus the _day of the year_. This makes it easy to check if a day should be highlighted or not:

```js
<div class="${prefix}__squares">
${
    // generate the offset of the start of year
    Array.from({ length: postMap.years[year].offset }).map((_, index) => {
        return `<div class="epg__box epg__box--empty"></div>`
    }).join('')
}
${
    // make a box for every day of the year
    // if at least one post exists, highlight that box
    Array.from({ length: postMap.years[year].days }).map((_, index) => {
        const dateIndexKey = `${year}-${index + 1}`
        const postCount = postMap.counts[dateIndexKey] || 0
        return `<div class="epg__box ${ postCount > 0 ? `epg__hasPost` : '' }"></div>`
    }).join('')
}
</div>
```

One edge case I hadn't considered until I was writing the docs was what if someone wanted two instances of the graph in different colors - the css injected into the page would apply to both. The solution I came up with was to add a `prefix` option wherein the classes, instead of being `epg__{something}`, will become `mycoolprefix-epg__{something}`.

I added a bunch of other options to handle all the different use cases I could think of but I'm sure they'll be more. Get started with [the docs](https://postgraph.rknight.me/) and if you use this on your site let me know, I'd love to see it.

[^1]: I am aware that [Day.js](https://day.js.org) is better but I just...forgot about it until right now