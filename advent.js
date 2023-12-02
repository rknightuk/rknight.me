const fs = require('fs')

const title = `Advent of Code 2023: Day ${process.argv[2]}`
const slug = `advent-of-code-2023-day-${process.argv[2].toLowerCase()}`
const slugDate = new Date().toISOString().split('T')[0]
const year = new Date().getFullYear()
const postDate = new Date().toISOString()

const meta = `---
title: "${title}"
permalink: /${slug}/index.html
date: ${postDate}
excerpt: "My Solution for \"{{TODO}}\""
layout: post
tags:
    - Development
    - AdventOfCode
---

### Part One

### Part Two

My solution is [on GitHub](https://github.com/rknightuk/adventofcode/tree/main/2023/{{TODO}}).
`

fs.writeFileSync(`./src/posts/${year}/${slugDate}-${slug}.md`, meta, { flag: "wx" })
