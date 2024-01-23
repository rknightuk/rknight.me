---
title: Making a Word Cloud for App Defaults
permalink: /blog/making-a-word-cloud-for-app-defaults/index.html
date: 2024-01-02T12:32:59.067Z
excerpt: "How I extracted all the words used in over 300 blog posts to make a word cloud"
layout: post
tags:
  - Development
project: https://defaults.rknight.me
---

Since I last [blogged about](https://rknight.me/blog/so-many-default-apps/) the [App Defaults](https://defaults.rknight.me/) project the number of blog posts has more than doubled; there are 320 now!

A few people have said something along the lines of "It would be cool to see what the most popular apps are" and I told them I'd been working on a way to do it. I shipped the best approximation I can do given the blog posts don't have a standard format: a word cloud.

I created a new script called [`extract.js`](https://github.com/rknightuk/app-defaults/blob/main/_wordcloud/extract.js) and used [`@extractus/article-extractor`](https://github.com/extractus/article-extractor) to extract the main article content from everyone's blog posts and write that to an HTML file.

```js
import { extract } from '@extractus/article-extractor'
import fs from 'fs'

const sites = JSON.parse(fs.readFileSync('../_data/sites.json', 'utf8'))

const run = async () => {
    for (let i = 0; i < sites.length; i++) {
        const input = sites[i].url

        try {
            console.log('running for ' + input)
            if (!fs.existsSync(`./_output/_${i}.html`)) {
                const article = await extract(input)
                fs.writeFileSync(`./_output/_${i}.html`, article.content)
            }
        } catch (err) {
            console.log('error caught, writing blank file')
            fs.writeFileSync(`./_output/_${i}.html`, '')
        }
    }
}
```

Once I had the HTML, I needed to extract the words. The initial version used a combination of regex, find-and-replace, and generally nonsense to try to get a clean set of words. This did not work; I ended up with words joined together and punctuation where it shouldn't be. I showed the demo on the [Hemispheric Views hangout](https://www.youtube.com/live/uMtl7hxBOJA?si=6Xr0wjxWX3e9G5dU&t=20064) and Jason was _very_ excited so I knew I had to get this working.

This morning I realised I was making this too difficult, I just wanted the text. Javascript can do that with `innerText` and `jQuery` can do it with `text()`. So I installed [Cheerio](https://www.npmjs.com/package/cheerio). I used Cheerio in the past to do [some web scraping](https://rknight.me/blog/web-scraping-with-node-and-cheerio/). I needed to remove some rogue punctuation after the fact, and do some splitting and joining but the output is much better than before:

```js

for (let i = 0; i < sites.length; i++) {
    // grab the html as above

    const htmlWords = $.text()
        // remove emoji
        .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
        .split('\n').join(' ')
        .split(' ')
        .map(w => {
            let wf = w.trim()
            if (wf.endsWith('.')) wf = wf.slice(0, -1)
            if (wf.endsWith(',')) wf = wf.slice(0, -1)
            if (wf.endsWith('!')) wf = wf.slice(0, -1)
            if (wf.endsWith('?')) wf = wf.slice(0, -1)
            if (wf.endsWith(':')) wf = wf.slice(0, -1)
            wf = wf.replaceAll('(', '')
                .replaceAll(')', '')
            return wf.toLowerCase()
        })
        .filter(w => {
            return w && w.length > 3 && !stopWords.includes(w.toLowerCase())
        })
        .join(' ')
        .split('/').join(' ')
        .split(' ')

    htmlWords.forEach(word => {
        if (!wordMap[word]) wordMap[word.toLowerCase()] = 0
        wordMap[word.toLowerCase()]++  
    })
}
```

Notice I'm also filtering out words shorter than 3 characters, removing some common punctuation, as well as checking against a list of [stop words](https://en.wikipedia.org/wiki/Stop_word). I expanded this stop words list to include some common words these blog posts all tend to have like `hemispheric`, `duel`, and `defaults`.

To make the word cloud I'm using [`wordCloud2.js`](https://github.com/timdream/wordcloud2.js/?tab=readme-ov-file) which requires the words to be in this format: `[['foo', 12], ['bar', 6]]`[^1]. Once I had extracted all the words, I sort them by frequency, map them to the correct format, the write them to Eleventy's data directory:

```js
// write the output of all the words
fs.writeFileSync('./_output/wordMap.json', JSON.stringify(wordMap, '', 2))

// sort by cound
const sorted = Object.entries(wordMap).sort((a, b) => b[1] - a[1])

let outputForWordCloud = []

Object.values(sorted).forEach(word => {
    outputForWordCloud.push(word)
})

// write both files to the data directory
fs.writeFileSync('../_data/wordsRaw.json', JSON.stringify(wordMap))
fs.writeFileSync('../_data/words.json', JSON.stringify(outputForWordCloud))
```

Once I had my data I added it to the window object on [the Word Cloud page](https://defaults.rknight.me/wordcloud/) and initialised the library:

```html
<script>
    window.WordCloudWords = {% raw %}{{ words | stringify | safe }}{% endraw %}
</script>

<style>
    .canvas {
        border: 20px solid white;
    }
</style>
<canvas id="wordcloud-canvas" class="canvas" height="600" width="1200"></canvas>

<script type="text/javascript">

(function() {
    // - 70 here to account for padding
    const width = (window.innerWidth > 1200 ? 1200 : window.innerWidth) - 70
    document.getElementById('wordcloud-canvas').width = width
    document.getElementById('wordcloud-canvas').height = 600
       
    WordCloud(document.getElementById('wordcloud-canvas'), { 
        list: window.WordCloudWords, 
        rotateRatio: 1, 
        shrinkToFit: true 
    })
})()
    
</script>
```

The final result as of this writing ([view the live version here](https://defaults.rknight.me/wordcloud/)):

![App Defaults word cloud](https://rknightuk.s3.amazonaws.com/site/app-defaults-word-cloud.jpg)

[^1]: What a strange format choice