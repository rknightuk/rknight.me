const fs = require('fs')

const title = process.argv[2]
const slug = title.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-')
const slugDate = new Date().toISOString().split('T')[0]
const year = new Date().getFullYear()
const postDate = new Date().toISOString()

const meta = `---
title: ${title}
permalink: /blog/${slug}/index.html
date: ${postDate}
excerpt: ""
layout: post
tags:
---`

fs.writeFileSync(`./src/posts/blog/${year}/${slugDate}-${slug}.md`, meta, { flag: "wx" })
