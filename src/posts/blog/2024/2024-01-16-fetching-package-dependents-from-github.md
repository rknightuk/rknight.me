---
title: "Fetching Package Dependents from GitHub"
permalink: /blog/fetching-package-dependents-from-github/index.html
date: 2024-01-16T20:50:28.515Z
excerpt: "Using linkedom to grab all repositories that are depending on my post graph plugin"
layout: post
tags:
    - Development
    - Eleventy
project: https://postgraph.rknight.me
---

A conversation in the [Eleventy Discord](https://www.11ty.dev/blog/discord/) led me to remember about the [dependents page](https://github.com/rknightuk/eleventy-plugin-post-graph/network/dependents) of a GitHub repository. That is, a list of other repositories that are depending on a package, in this case my [Post Graph plugin](https://postgraph.rknight.me/). I wanted to show which people are using the package on the post graph website.

![Post graph dependents](https://rknightuk.s3.amazonaws.com/site/post-graph-dependents.png)

GitHub don't offer an API endpoint for this so I made a new data file in Eleventy, installed [`linkedom`](https://www.npmjs.com/package/linkedom), and got to inspecting the elements of that page. The dependents list is an element with an id of `dependents` with two links per repo. The first leads to the author's profile and the second to the repository: this second link is the one I care about. To narrow it down I had to target both the class (`text-bold`) and the data attribute (`data-hovercard-type`) then grab the `href` from it:

```js
const res = await fetch('https://github.com/rknightuk/eleventy-plugin-post-graph/network/dependents')
const html = await res.text()

const { document } = parseHTML(html)

const dependents = Array.from(document.querySelectorAll('#dependents .text-bold[data-hovercard-type]')).map((el) => {
    return {
        link: `https://github.com${el.href}`,
        name: el.href.replace('/','')
    }
})
```

Once this was done I could output the list on the Post Graph site at the top:

```njk
{% raw %}{% if dependents.length > 0 %}
    <details>
        <summary>Used by {{ dependents.length }} people</summary>
        <ul>
            {% for d in dependents %}
                <li><a href="{{ d.link }}"><code>{{ d.name }}</code></a></li>
            {% endfor %}
        </ul>
    </details>
{% endif %}{% endraw %}
```