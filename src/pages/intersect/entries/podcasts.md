---
title: Podcasts
permalink: intersect/podcasts/index.html
eleventyNavigation:
  key: Podcasts
  parent: Intersect
---

### Get Incomparable Titles and Links

Used when generating the initial versions of my [Defocused list on Letterboxd](https://letterboxd.com/rknightuk/list/defocused-podcast/).

```js
titles = document.getElementsByClassName('asset-name entry-title')

data = []
for (var i = 0; i < titles.length; i++) {
    const title = titles[0].innerText
    const link = titles[i].children[0].href
    data.push({ title, link })
}
```