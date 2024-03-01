import { input } from '@inquirer/prompts'
import fs from 'fs'
import utils from '../utils.js'

export default async (__siteroot) => {
    const link = await input({ message: 'Link' })

    console.log('Fetching link data...')

    const domain = new URL(link).origin

    const {
        title: foundTitle, author, feed, mastodon
    } = await utils.fetchPageData(link, ['title', 'author', 'feed', 'mastodon'])

    const title = await input({ message: 'Link title', default: foundTitle })

    const slug = await input({ message: 'Post slug', default: utils.slugify(title) })
    const slugDate = new Date().toISOString().split('T')[0]
    const year = new Date().getFullYear()
    const postDate = new Date().toISOString()

    const meta = `---
title: "${title}"
permalink: /links/${slug}/index.html
link: ${link}
date: ${postDate}
author: 
  name: ${author ? author : ''}
  web: ${domain}
  feed: ${feed}
  mastodon: ${mastodon.join(', ')}
---`

    fs.writeFileSync(`${__siteroot}/src/posts/links/${year}/${slugDate}-${slug}.md`, meta, { flag: "wx" })
}