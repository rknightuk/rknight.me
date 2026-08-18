import { input } from '@inquirer/prompts'
import checkbox from '@inquirer/checkbox'
import fs from 'fs'
import utils from '../utils.js'

export default async (__siteroot) => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' })
    const currentYear = new Date().getFullYear()
    const title = `Now (${currentMonth} ${currentYear})`
    const slug = utils.slugify(title)

    const slugDate = new Date().toISOString().split('T')[0]
    const year = new Date().getFullYear()
    const postDate = new Date().toISOString()

    const tags = ['now']

    let meta = `---
title: "${title}"
permalink: /blog/${slug}/index.html
date: ${postDate}
excerpt: "What I'm doing now. ${currentMonth} ${currentYear} edition"
tags: [now]
---`

    fs.writeFileSync(`${__siteroot}/src/posts/blog/${year}/${slugDate}xx-${slug}.md`, meta, { flag: "wx" })
}