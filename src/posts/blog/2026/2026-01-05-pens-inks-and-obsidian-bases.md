---
title: "Pens, Inks, and Obsidian Bases"
permalink: /blog/pens-inks-and-obsidian-bases/index.html
date: 2026-01-05T20:55:44.989Z
excerpt: "Importing my pens and inks into Obsidian bases and showing a preview of a hex code in a Base"
tags:
    - Analogue
---

I finally got around to trying out [Obsidian Bases](https://help.obsidian.md/bases) this evening but I needed a relatively small dataset to try it with. So I grabbed my ink export from [fountain pen companion](https://fpc.ink) (FPC) and converted that CSV to markdown files. This isn't relevant to using Bases but here's the abridged version of that code anyway:

```js
// inks.js
const fs = require('fs')

fs.readFileSync('collected_inks.csv', 'utf-8').split('\n').slice(1).forEach(line => {
    const data = line.split(';')
    const title = `${data[0]} ${data[2]}`
    const content = [
        '---',
        `brand: '${data[0]}'`,
        `name: '${data[2]}'`,
        `hex: '${data[4]}'`,
        `type: ${data[3]}`,
        `purchased: ${data[13]}`,
        '---'
    ]

    fs.writeFileSync(`./inks/${title}.md`, content.join('\n'))
})

// Diamine Meadow.md
---
// ...
hex: #59ac2b
// ...
---
```

Once I'd added the new files I created a new Base and added a filter to only show files in my `Inks` folder. FPC includes a hex code for each ink and ideally I wanted to show this color in the table view. If I could run Javascrupt on every change I would do something like this to change the colour of the text where `metadata-input-longtext` is the classname of the cell elements of the table:

```js
Array.from(document.getElementsByClassName('metadata-input-longtext')).forEach(el => {
    if (el.innerText.startsWith('#')) {
        el.style.color = el.innerText
    }
})
```

Sadly (or not), you can't do that in Obsidian. I tried using [`attr()`](https://css-tricks.com/almanac/functions/a/attr/) but that only works if the data attribute is on the element you want to style. I then saw in the docs that Bases also has [formulas](https://help.obsidian.md/formulas) as well as an [`html` function](https://help.obsidian.md/bases/functions#%60html()%60). So I added a formula to my ink Base (Properties > Add Formula) and added a formula that uses the `html` function.

```js
html("<span style='height: 100%; aspect-ratio: 1/1; background:" + hex + "'></span>")
```

![A table showing a list of inks and their properties. A column named color shows a preview of the hex code](https://cdn.rknight.me/site/2026/obsidian-bases-with-hex-color-preview.jpg)

Next up will be doing the same for my pens and linking them to the inks that they currently have in them. Now I've tried it I can see how Bases could be really powerful on some more complicated data. Perhaps I'll move some of [my collections](/collections) into Obsidian and sync it to my website.

---

Some posts that helped me understand Bases better:

- [A new approach to tracking reading with Obsidian Bases](https://thewallflowerdigest.co.uk/life/blog/a-new-approach-to-tracking-reading-with-obsidian-bases/)
- [Obsidian Bases: Star Ratings and Automatic Covers](https://tylersticka.com/journal/obsidian-bases-star-ratings-and-automatic-covers/)