---
title: Generating and Caching Open Graph Images with Eleventy
permalink: /blog/generating-and-caching-open-graph-images-with-eleventy/index.html
date: 2023-12-24T10:09:42.501Z
excerpt: "How I'm caching my open graph images with eleventy-plugin-og-image instead of generating them on every build"
layout: post
tags:
    - Eleventy
    - Development
---

I recently added automatically generated open graph images to my site using [`eleventy-plugin-og-image`](https://github.com/KiwiKilian/eleventy-plugin-og-image). Here is the open graph image for this post:

<img style="border: 1px solid white;" src="/assets/ogi/bloggenerating-and-caching-open-graph-images-with-eleventy.png" alt="Generating, and Caching, Open Graph Images with Eleventy">

I won't go over how to use the plugin; the docs on the repo and [this blog post](https://lewisdale.dev/post/adding-statically-generated-open-graph-images/) explain that very well. What I didn't like is that these are generated every time the site builds which, aside from being wildly inefficient, added significant time to my builds.

I [posted about this](https://social.lol/@robb/111574217802419330) on the 'don and [Sophie replied with how she is doing it](https://social.lol/@sophie/111574234339127389):

> I run it locally when I write a new post, and commit the results [...] basically the dev server will spit out the OG image

This is exactly what I wanted - generate the images once, and commit them to the repo. To do this I had to modify the plugin config to output the images to my `src` folder instead of the output folder:

```diff
eleventyConfig.addPlugin(ogImagePlugin, {
+    outputDir: 'src/assets/ogi',
    satoriOptions: {
```

This will output the image to my `assets` directory, which in turn gets copied into my built site. This did cause a new issue though - Eleventy watches for changes in source files and rebuilds the site so every time a new image was made, Eleventy would rebuild again. To solve this, I used `watchesIgnore` in my config file:

```js
eleventyConfig.watchIgnores.add('src/assets/ogi/**/*')
```

I only wanted these to be generated in development mode so I added an `env` data file to check the mode:

```js
module.exports = function() {
  return {
    production: process.env.ELEVENTY_RUN_MODE === 'build'
  }
}
```

Then I updated my base layout so it only uses the `ogImage` plugin when in development mode. In production, it uses the full path to the image:

```js
{% raw %}{% if env.production %}
    <meta property="og:image" content="https://rknight.me/assets/ogi/{{ page.url | slug }}.png">
{% else %}
    {% ogImage "src/og-image.og.njk", { title: title | safe } %}
{% endif %}{% endraw %}
```

The final problem I had is the plugin will wipe the output directory on every change. [This pull request](https://github.com/KiwiKilian/eleventy-plugin-og-image/pull/74) added that functionality and originally had an option to pass in for it to happen or not, but that option didn't make it to the final version. Based on the discussion it looked as though this wasn't something wanted in the plugin, so I made a copy of the plugin in my `plugins` directory and removed the line that deleted the files each time:

```diff
- eleventyConfig.on('eleventy.before', () => {
-    const options = mergeOptions(directoriesConfig, pluginOptions);
-    fs.rmSync(options.outputDir, { recursive: true, force: true });
- });
```

This process does require me to run `--serve` at least once each time I added a blog post but there is rarely a time where I wouldn't do that. 