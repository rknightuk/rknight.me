---
title: CSS
permalink: intersect/web/css/index.html
eleventyNavigation:
  key: CSS
  parent: Web
---

### Include Stylesheet

```html
<link rel="stylesheet" href="style.css">
```

### System Font Defaults

[Shipping system fonts to GitHub.com](https://markdotto.com/2018/02/07/github-system-fonts/)

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
```

See also: [Modern Font Stacks](https://modernfontstacks.com/)

### Using CSS Variables

[Browser support for CSS variables](https://caniuse.com/css-variables)

```css
:root {
  --primary-color: #db0a5b;
}

.something {
  color: var(--primary-color);
}
```

### Dark Mode

```css
:root {
  --text-color: #000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #fff;
  }
}
```

### Hover Element Change Another

[The Adjacent-Sibling Selector](https://meyerweb.com/eric/articles/webrev/200007a.html)

```html
<div class="hoverer">hover me</div>
<div class="hoveree">and I will appear</div>
```

```css
.hoveree {
    display: none;
}
    
.hoverer:hover + .hoveree {
    display: block;
}
```

### Quick Calendar with grids

[Source](https://mastodon.nz/@mez/110063913946649082)

Setting up a calendar with HTML/CSS is so easy these days.
Make a container, put 28, 30, or 31 elements inside. Add two (2) lines of CSS:

```css
display: grid;
grid-template-columns: repeat(7, 1fr);
```

Then tell `calendar > day:first-child` to start at the appropriate spot in the grid with `grid-column-start: n`

### Double Text Shadow

```css
text-shadow: rgba(10, 189, 240, 0.298039) 3px 3px 0px, rgba(254, 1, 1, 0.298039) -3px -3px 0px;
```

### Stop iOS changing unicode characters to emoji

```css
[aria-checked="false"] > i::before {
    content: "\2610\fe0e";
}
[aria-checked="true"] > i::before {
    content: "\2611\fe0e";
}
```