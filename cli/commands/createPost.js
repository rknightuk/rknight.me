import { input } from '@inquirer/prompts'
import checkbox from '@inquirer/checkbox'
import fs from 'fs'
import utils from '../utils.js'

export default async (__siteroot) => {
    const title = await input({ message: 'Post title' })
    const slug = await input({ message: 'Post slug', default: utils.slugify(title) })

    const slugDate = new Date().toISOString().split('T')[0]
    const year = new Date().getFullYear()
    const postDate = new Date().toISOString()

    const tags = await checkbox({
        message: 'Tags',
        choices: [
            { name: 'ActivityPub', value: 'ActivityPub' },
            { name: 'AdventOfCode', value: 'AdventOfCode' },
            { name: 'AI', value: 'AI' },
            { name: 'Alfred', value: 'Alfred' },
            { name: 'Apps', value: 'Apps' },
            { name: 'BabyKnight', value: 'BabyKnight' },
            { name: 'Development', value: 'Development' },
            { name: 'DIY', value: 'DIY' },
            { name: 'Eleventy', value: 'Eleventy' },
            { name: 'EchoFeed', value: 'EchoFeed' },
            { name: 'Food', value: 'Food' },
            { name: 'Games', value: 'Games' },
            { name: 'Hackathon', value: 'Hackathon' },
            { name: 'Homescreen', value: 'Homescreen' },
            { name: 'Lego', value: 'Lego' },
            { name: 'Letters', value: 'Letters' },
            { name: 'LinkDump', value: 'LinkDump' },
            { name: 'MacOS', value: 'MacOS' },
            { name: 'Mastodon', value: 'Mastodon' },
            { name: 'Movies', value: 'Movies' },
            { name: 'Music', value: 'Music' },
            { name: 'OpenWeb', value: 'OpenWeb' },
            { name: 'Personal', value: 'Personal' },
            { name: 'Podcasting', value: 'Podcasting' },
            { name: 'Raycast', value: 'Raycast' },
            { name: 'Recipes', value: 'Recipes' },
            { name: 'Shortcuts', value: 'Shortcuts' },
            { name: 'SocialMedia', value: 'SocialMedia' },
            { name: 'StJude', value: 'StJude' },
            { name: 'ThingsILike', value: 'ThingsILike' },
            { name: 'TV', value: 'TV' },
            { name: 'WeblogPoMo', value: 'WeblogPoMo' },
            { name: 'YearInReview', value: 'YearInReview' },
        ],
    })

    const project = await utils.selectProject(__siteroot, {
        title: 'none',
        value: 'none',
        description: 'none',
    })

    let meta = `---
title: "${title}"
permalink: /blog/${slug}/index.html
date: ${postDate}
excerpt: ""`

    if (tags.length > 0)
    {
        meta = `${meta}\ntags:\n${tags.map(tag => `    - ${tag}`).join('\n')}`
    }

    if (project.value !== 'none') {
        meta = `${meta}\nproject: ${project.link}`
    }

    meta = `${meta}\n---`

    fs.writeFileSync(`${__siteroot}/src/posts/blog/${year}/${slugDate}-${slug}.md`, meta, { flag: "wx" })
}