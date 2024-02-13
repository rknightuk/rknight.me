---
title: Javascript
eleventyNavigation:
  key: Javascript
  parent: Programming
---

### Apply Viewbox to SVG from an Element

```js
sourceSVG = document.getElementById('source-svg')
// get viewbox data
viewBox = sourceSVG.viewBox.baseVal
// get existing
existing = document.getElementById('existing-svg')
// set viewbox
existing.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`)
```

### Keyboard Events

- `KeyboardEvent.keycode` is deprecated, [use `KeyboardEvent.key` instead](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
### Return Item at Index with `at()`

```js
const array = ['one', 'two', 'three']
array.at(1) // two
```

[Array.prototype.at() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)

### Sorting an Array

```js
const myArray = [{ attr: 'z' }, { attr: 'a' }, { attr: 'q' }]

myArray.sort((a,b) => (a.attr > b.attr) ? 1 : ((b.attr > a.attr) ? -1 : 0))
```

### Deduplicate Array

```js
const dupedArray = ['one', 'two', 'one']
const newDeDupedArray = [...new Set(dupedArray)]
// ['one', 'two']
```
### Scroll Page

[`scrollTo()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo)

```js
element.scrollTo({
  top: 100,
  left: 100,
  behavior: 'smooth'
})
```

[`scrollIntoView()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)

```js
element.scrollIntoView({ 
  behavior: 'smooth', 
  inline: 'start'
})
```

### Disable Scrolling

You probably shouldn't do this in almost all cases. [Source](https://www.geeksforgeeks.org/how-to-disable-scrolling-temporarily-using-javascript/).

```js
function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = () => {}
}
```

### Detect if Page Has Scroll Bar

```js
window.innerHeight > document.body.offsetHeight
```

### Get Query Params from URL

[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#browser_compatibility)

```js
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
```

### Get URL Parts

```js
const url = new URL('https://example.com')

{
    hash: "",
    host: "example.com",
    hostname: "example.com",
    href: "https://example.com/",
    origin: "https://example.com",
    password: "",
    pathname: "/",
    port: "",
    protocol: "https:",
    search: "",
    searchParams: URLSearchParams {},
    username: ""
}
```

### querySelectorAll Multiple Arguments

```js
document.querySelectorAll('p, li')
```
### Get Parent Element

```js
element.closest('.class-name')
```

### Match Regex on String

```js
const regex = /#/g
myString.match(regex)

// returns null or an array of matches
```

### Get First N Elements of Array

```js
myArray.slice(0, size)
```

### Replace Contents of File

I used this when I realised it was better to have frontmatter for Eleventy than try and extract it myself.

```js
const fs = require('fs')

const FILES = [
    'path/to/file/index.md',
    'path/to/file/another.md'
]

FILES.forEach(path => {
    let contents = fs.readFileSync(path, 'utf-8')
    const headingLine = contents.split('\n')[0]
    const heading = headingLine.replace('# ', '')
    const frontMatter = `---
title: ${heading}
---`

    contents = contents.replace(headingLine, frontMatter)

    fs.writeFileSync(path, contents)
})
```

### Set xlink:href of Element

```js
element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', value)
```

### Detect Dark Mode

```js
// returns boolean
window.matchMedia('(prefers-color-scheme: dark)').matches
window.matchMedia('(prefers-color-scheme: light)').matches
window.matchMedia('(prefers-color-scheme: no-preference)').matches
```

### Caching

Simple caching technique I used before I'd read the docs for the [Eleventy Cache Assets plugin](https://www.11ty.dev/docs/plugins/cache/). Alway read the docs first.

```js
const fs = require('fs')
const cachePath = './cache_path.json'

if (fs.existsSync(cachePath))
{
    console.log('Loading data from cache')
    return {
        myData: JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
    }
}

console.log('Loading data from API')

const res = await theApiRequest()

fs.writeFileSync(cachePath, JSON.stringify(res))

return {
    myData: res
}
```

### Get Emoji Flag from Country Code

[Country Code to Flag Emoji](https://dev.to/jorik/country-code-to-flag-emoji-a21)

```js
function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
```

### Assert with console

`console.assert(1 === 1)`

### Format Lists with `Intl.ListFormat`

```js
const vehicles = ['One', 'Two', 'Three'];
const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
formatter.format(vehicles) // One, Two, and Three
```

[Intl.ListFormat docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)