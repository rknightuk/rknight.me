---
title: Using SVG Sprites
permalink: /blog/using-svg-sprites/index.html
date: 2023-11-21T21:41:14.019Z
excerpt: "How to use SVG sprites on your website"
layout: post
tags:
  - Development
---

Recently someone emailed me to ask how I was doing SVGs on my website because they'd looked in the source but it wasn't obvious how it actually rendered the SVG so I figured I would do a proper post about it. Here is their email:

---

> I'm looking to steal more ideas from you and found this while looking through your web site source:

```html
<svg class="icon">
  <use xlink:href="#rklogo"></use>
</svg>
```

> But when I inspect the DOM I see it fully expanded:

```html
<svg class="icon">
    <use xlink:href="#rklogo"></use>
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" id="rklogo">
        <path class="logo-bar" fill="currentColor" fill-rule="evenodd" stroke="none" d="M 300 400 L 200 200 L 300 0 L 400 0 L 300 200 L 400 400 L 300 400 Z"></path>
        <path class="logo-dot" fill-rule="evenodd" stroke="none" d="M 0 399 L 75 399 L 75 324 L 0 324 Z"></path>
        <path class="logo-bar" fill="currentColor" fill-rule="evenodd" stroke="none" d="M 150 400 L 50 200 L 106 89 L 0 89 L 0 0 L 250 0 L 150 200 L 250 400 L 150 400 Z"></path>
    </svg>
</svg>
```

---

### Other Methods

Before I get into how to use sprites, there are two arguably easier options to use an SVG on a website: `img` and directly:

```html
<!-- use the SVG just like any other image -->
<img src="icon.svg">

<!-- put the SVG in directly -->
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <path fill="#000000" fill-rule="evenodd" stroke="none" d="M 300 400"></path>
</svg>
```

Using an `img` tag is quick but you lose any ability to change the SVG colors, or animate it, with CSS. If you have an SVG that doesn't need any of that, this works fine.

Putting the SVG in the HTML directly is also a perfectly fine way to do it, but it can get messy if you have lots of icons, or you need to reuse the same icon multiple times.

### SVG Sprites

An SVG sprite is basically a collection of SVGs inside an `svg` tag that can be used with the syntax I already mentioned at the top of the article. A sprite looks something like this where we have an `svg` tag and then some SVGs inside that. Note the `id` attribute - this is used to identify the SVG when we use it elsewhere on the site. For my sites, I usually put the sprite right before the closing `body` tag.

```html
<svg width="0" height="0" style="display: none">
   <svg  id="buymeacoffee" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z"></path>
   </svg>
   <svg  id="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
   </svg>
   <svg  id="mastodon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"></path>
   </svg>
</svg>
```


Because the SVGs have `fill="currentColor` set instead of a specific color, we can style them just using `color: #e33d94` in CSS. Handy. To use one of the SVGs, for example `buymeacoffee`, we can do the following in the HTML wherever we need it:

```html
<svg>
    <use xlink:href="#buymeacoffee"></use>
</svg>
``````

Which will output the icon:

![](https://cdn.rknight.me/site/svg-icon-coffee.png)

You _can_ just paste in your SVGs to make a sprite or you can do what I do and use [https://svgsprit.es](https://svgsprit.es/). You can drop in a bunch of SVGs and it will give you back your sprite for putting on your site. A lot of static site generators also have plugins to do this, for example [this one for Eleventy](https://github.com/patrickxchong/eleventy-plugin-svg-sprite).

You can view the SVG sprite for [this site on GitHub here](https://github.com/rknightuk/rknight.me/blob/master/src/_includes/svgs.njk).