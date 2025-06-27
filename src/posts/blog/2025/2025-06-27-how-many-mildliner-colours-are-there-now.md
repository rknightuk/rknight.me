---
title: "How Many Mildliner Colours Are There Now?"
permalink: /blog/how-many-mildliner-colours-are-there-now/index.html
date: 2025-06-27T20:13:45.638Z
excerpt: "I made a mildliner reference site to keep track of all the colours"
tags:
    - Analogue
project: https://mildliners.rknight.me
---

Yesterday I ordered the 2025 Mildliner pack which I've had to get direct from China because nowhere in the UK appears had them for sale yet and I'm nothing if not an obsessive completionist with no patience. 

New colours meant I needed to update my [already-updated color chart](http://localhost:8080/blog/how-many-mildliner-colours-are-there/) to include these new ones[^1] but updating a static image doesn't spark joy so I did what I always do: new website.

tl;dr: It's called Mildliner Reference and it lives at [mildliners.rknight.me](https://mildliners.rknight.me). Subdomains, baby!

![A stripy multi-coloured background. Over the top it says Mildliner Reference in a font that looks like it was written by a marker](https://cdn.rknight.me/site/2025/mildliner-preview.jpg)

I grabbed all the colour names, sets, hex codes and added them to a JSON data file in a fresh Eleventy site:

```js
// _data/mildliners.js
module.exports = function () {
    return [
        { name: 'Pink', set: 'Fluorescent', color: 'ffb6d9' },
        { name: 'Orange', set: 'Fluorescent', color: 'ffdfb5' },
        { name: 'Yellow', set: 'Fluorescent', color: 'f0f4a3' },
        // and so on
    ]
}
```

The hex codes are based on Zebra's official chart with the exception of the new colours which I grabbed off a marketing image. I used some similar logic to [this archive page](https://rknight.me/blog/jekyll-category-year-archive/) to group the colors by the set they come with so each set looks like this in the HTML. This will allow me, in theory, to do some CSS magic and do different layouts without a change to the underlying HTML.

```html
<div class="mildliner-set scribble-border">
    <h1 class="marker">Fluorescent</h1>
    <div class="mildliner-singles">
        <div class="mildliner" style="background-color: #ffb6d9; border-color: #ffb6d9;">
            <h2>Pink</h2>
            <p class="mildliner-color" data-color="#ffb6d9">#ffb6d9 </p>
        </div>
        <!-- and so on with the other colors -->
    </div>
</div>
```

Finally I added the ability to copy the hex code to the clipboard because quite frankly all these colours are lovely and I want to use them on other websites. And this was a good excuse to use [Boochild](https://gassstype.com/boochild/) which is a banger of a typeface.

It's been two years since the last release of new Mildliners so I suspect this won't need much updating but at least it'll be easy when the next set comes along. The code is [on GitHub](http://github.com/rknightuk/mildliners). 

[^1]: The US Zebra site doesn't seem to acknowledge these colors even exist as of this writing