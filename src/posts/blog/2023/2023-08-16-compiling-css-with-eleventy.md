---
title: Compiling CSS with Eleventy
permalink: /blog/compiling-css-with-eleventy/index.html
date: 2023-08-16T12:30:35.115Z
excerpt: "A list of different options for compiling CSS with Eleventy"
tags:
  - Development
  - Eleventy
---

Yesterday I [asked on Mastodon](https://social.lol/@robb/110894030545897361) what methods people are using for compiling CSS with Eleventy. It's been a while since I've need anything more than a single stylesheet but since I keep adding various things to my site, the stylesheet has got a bit unweildy. I'll admit, I know very little about the various css libraries and tools (the last time I did this I used Gulp which tells you how long ago that was) so I was coming to this with basically no knowledge. My basic requirements were:

- Compile multiple CSS files into one
- Minify the CSS
- Keep everything in Eleventy. I don't want to have to manage additional libraries and scripts outside the Eleventy build step.

### PostCSS

The first response was [Jason](https://social.lol/@jgarber@mastodon.cc/110894115168581629) with his method of [using PostCSS](https://github.com/jgarber623/refresh-dc.org/blob/main/lib/plugins/postcss.js) with the `easy-import` and `nesting` plugin. This is a nice solution and I have used [PostCSS](https://postcss.org) a little bit in the past. [Martin Schneider has a nice blog post](https://martinschneider.me/articles/generating-css-with-postcss-and-eleventy-before/) about using PostCSS before the site is built so they can inline and purge the CSS.

### Read the fucking manual

David Darnes came at me with a classic [RTFM](https://en.wikipedia.org/wiki/RTFM). Turns out Eleventy has a [page on the docs for doing exactly this](https://www.11ty.dev/docs/languages/custom/#example-add-sass-support-to-eleventy). This method uses [Sass](https://www.npmjs.com/package/sass) and requires a little bit of config. One thing to note is by default this will output _all_ `.scss` file to the built site, so I added a check to see if the file is named `app` and if it's not, then skip it. Alternatively you can put your files in an `_includes` directory and these won't be output (thanks Dave). `style: 'compressed'` will minimise the CSS.

```js
// .eleventy.js
const sass = require('sass')
const path = require('node:path')

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('scss')

  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath)
      if (parsed.name !== 'app') return // we only want the output of app.scss
      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || '.', this.config.dir.includes],
        style: 'compressed',
      })

      return async (data) => {
        return result.css
      }
    },
  })
}
```

### LightningCSS

I hadn't heard of [LightningCSS](https://lightningcss.dev) until yesterday but it's a "CSS parser, transformer, bundler, and minifier" built with Rust. [Stephanie Eckles](https://thinkdobecreate.com/) has an [Eleventy plugin](https://github.com/5t3ph/eleventy-plugin-lightningcss) for using LightningCSS which handles all the configuration and as a bonus ignores any files that start with `_` so they won't get copied to the build folder.

```js
// .eleventy.js
const lightningCSS = require("@11tyrocks/eleventy-plugin-lightningcss")

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(lightningCSS)
}
```

Ultimately I like how simple this is to add to my existing site without any additonal configuration so I think this is the way I'm going to go.