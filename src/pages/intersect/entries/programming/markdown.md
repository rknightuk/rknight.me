---
title: Markdown
permalink: intersect/programming/markdown/index.html
eleventyNavigation:
  key: Markdown
  parent: Programming
---

### Strikethrough

Strikethrough on Github is one _or_ two tildes, but the [Github Flavored Markdown spec](https://github.github.com/gfm/) has it as two. I spent a while wondering why Eleventy didn't support strikethrough. [John Gruber wrote about strikethrough here](https://daringfireball.net/linked/2015/11/05/markdown-strikethrough-slack) which was never in his [original Markdown spec](https://daringfireball.net/projects/markdown/syntax).

```txt
// on Github
~this will strikethrough~
~~this will also strikethrough~~

// basically anywhere other markdown library
~~this will strikethrough~~
```