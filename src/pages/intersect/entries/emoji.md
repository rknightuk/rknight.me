---
title: Emoji
permalink: intersect/emoji/index.html
eleventyNavigation:
  key: Emoji
  parent: Intersect
---

### Emoji Dataset

[Emoji Data by iamcal](https://github.com/iamcal/emoji-data) is the most complete source I've found. [Unicode Emoji JSON](https://github.com/muan/unicode-emoji-json) is also good but doesn't have as much data.

If you need to convert from `unified` code into the native emoji in javascript:

```js
const unicodes = e.unified.split('-')
const codePoints = unicodes.map((u) => `0x${u}`)
const nativeEmoji = String.fromCodePoint(...codePoints)
````