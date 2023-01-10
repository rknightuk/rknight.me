const fs = require('fs')

const title = process.argv[2]
const slug = title.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-')
const date = new Date().toISOString().split('T')[0]
const year = new Date().getFullYear()

const meta = `---
title: ${title}
permalink: /${slug}/index.html
date: ${date}
excerpt: ""
layout: post
---`

fs.writeFileSync(`./src/posts/${year}/${date}-${slug}.md`, meta, { flag: "wx" })
