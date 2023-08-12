---
title: Block ChatGPT with robots.txt
permalink: /block-chatgpt-with-robotstxt/index.html
date: 2023-08-12T09:12:43.328Z
excerpt: "How to block ChatGPT from crawling your site with a robots.txt file"
layout: post
---

A `robots.txt` file "tells search engine crawlers which URLs the crawler can access on your site". Generally one would use this to tell a search engine which directories should be crawled, which ones shouldn't, or to completely block from crawling your site. The file lives at the root of your site. You can [see mine here](https://rknight.me/robots.txt). 

[ChatGPT](https://chat.openai.com) has two user agents that might attempt to crawl your site: [`GPTBot`](https://platform.openai.com/docs/gptbot) and [`ChatGPT-User`](https://platform.openai.com/docs/plugins/bot/chatgpt-user). To disallow crawling from both of these, we can set our `robots.txt` file like so:

```txt
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /
```

### Adding a robots.txt file to Eleventy

Using Eleventy's [passthrough file copy](https://www.11ty.dev/docs/copy/) we can create a `robots.txt` file and then add the following to our Eleventy config to make sure the file is copied to your built site:

```js
eleventyConfig.addPassthroughCopy('robots.txt')
```

And there we go. ChatGPT, in theory, should be blocked from crawling our site.