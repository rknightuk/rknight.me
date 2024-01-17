import { program } from 'commander'
import select from '@inquirer/select'
import { input } from '@inquirer/prompts'
import checkbox from '@inquirer/checkbox'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import moment from 'moment'
import { parseHTML } from 'linkedom'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const __siteroot = __dirname.replace('/cli', '');

const slugify = (string) => {
    return string.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-')
}

const runWizard = async () => {
        console.log(chalk.hex('#e33d94')`............................................................
............................................................
..................@@@@@@@@@@@@@@,..&@@@@@,..................
..................@@@@@@@@@@@@@...@@@@@@....................
........................@@@@@@...@@@@@@.....................
.......................@@@@@@...@@@@@@......................
.....................%@@@@@*..%@@@@@*.......................
.......................@@@@@@...@@@@@@......................
........................@@@@@@...@@@@@@.....................
..................@@@@@..@@@@@@...@@@@@@....................
..................@@@@@...#@@@@@/..#@@@@@/..................
............................................................
.......................rknight.me...........................
............................................................
`)

    const type = await select({
        message: 'What do you want to do?',
        choices: [
            {
                name: 'Create a new post',
                value: 'post',
                description: 'Create a new post',
            },
            {
                name: 'Create a new link post',
                value: 'link',
                description: 'Create a new link post',
            },
            {
                name: 'Create a new changelog entry',
                value: 'changelog',
                description: 'Create a new changelog entry',
            },
        ],
    })

    switch (type) {
        case 'post':
            createPost()
            break
        case 'link':
            createLink()
            break
        case 'changelog':
            createChangelog()
            break
    }
}

/////////////////////////////////
//////// Create Post ////////////
/////////////////////////////////
const createPost = async () => {
    const title = await input({ message: 'Post title' })
    const slug = await input({ message: 'Post slug', default: slugify(title) })

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
            { name: 'Food', value: 'Food' },
            { name: 'Games', value: 'Games' },
            { name: 'Hackathon', value: 'Hackathon' },
            { name: 'Homescreen', value: 'Homescreen' },
            { name: 'Lego', value: 'Lego' },
            { name: 'Letters', value: 'Letters' },
            { name: 'MacOS', value: 'MacOS' },
            { name: 'Mastodon', value: 'Mastodon' },
            { name: 'Movies', value: 'Movies' },
            { name: 'Music', value: 'Music' },
            { name: 'OpenWeb', value: 'OpenWeb' },
            { name: 'Personal', value: 'Personal' },
            { name: 'Podcasting', value: 'Podcasting' },
            { name: 'Recipes', value: 'Recipes' },
            { name: 'Shortcuts', value: 'Shortcuts' },
            { name: 'SocialMedia', value: 'SocialMedia' },
            { name: 'StJude', value: 'StJude' },
            { name: 'TV', value: 'TV' },
            { name: 'YearInReview', value: 'YearInReview' },
        ],
    })

    let existingProjects = JSON.parse(fs.readFileSync(`${__siteroot}/src/_data/site/projects.json`, 'utf8'))
    existingProjects = [
        {
                title: 'none',
                value: 'none',
                description: 'dsjbf',
        },
        ...existingProjects.current, 
        ...existingProjects.podcasts, 
        ...existingProjects.profile, 
        ...existingProjects.stjude
    ]

    const project = await select({
        message: 'Link to Project?',
        choices: existingProjects.map((project, i) => {
            return {
                name: project.title,
                value: i,
                description: project.description,
            }
        }),
        pageSize: 15,
    })

    let meta = `---
title: "${title}"
permalink: /blog/${slug}/index.html
date: ${postDate}
excerpt: ""
layout: post`

    if (tags.length > 0)
    {
        meta = `${meta}\ntags:\n${tags.map(tag => `    - ${tag}`).join('\n')}`
    }

    if (project !== 0) {
        meta = `${meta}\nproject: ${existingProjects[project].link}`
    }

    meta = `${meta}\n---`

    fs.writeFileSync(`${__siteroot}/src/posts/${year}/${slugDate}-${slug}.md`, meta, { flag: "wx" })
}

/////////////////////////////////
//////// Create Link ////////////
/////////////////////////////////
const createLink = async () => {
    const link = await input({ message: 'Link' })

    console.log('Fetching link data...')

    const domain = new URL('https://www.fromjason.xyz/p/notebook/where-have-all-the-websites-gone/').origin
    const page = await fetch(link)
    const html = await page.text()

    const { document } = parseHTML(html)
    let title = document.querySelector('title').textContent

    let authorName = document.querySelector('.p-name')?.textContent
    if (!authorName) authorName = document.querySelector('[rel="author"]')?.textContent
    
    const mastodonAccounts = Array.from(document.querySelectorAll('[rel="me"]')).filter(e => {
        return e.href.includes('@') && !e.href.includes('twitter.com') && !e.href.includes('threads.net') && !e.href.includes('tiktok.com')
    }).map(e => e.href).join(', ')

    const FEED_SELECTORS = [
        'link[type="application/rss+xml"]',
        'link[type="application/atom+xml"]',
        'link[type="application/json"]',
    ]

    let feedUrl = null
    FEED_SELECTORS.forEach((selector) => {
    if (feedUrl) return
        const feedLink = document.querySelector(selector)
        if (feedLink) feedUrl = feedLink.href
    })

    if (!feedUrl.startsWith('http')) feedUrl = `${domain}${feedUrl}`

    title = await input({ message: 'Link title', default: title })

    const slug = await input({ message: 'Post slug', default: slugify(title) })
    const slugDate = new Date().toISOString().split('T')[0]
    const year = new Date().getFullYear()
    const postDate = new Date().toISOString()

    const meta = `---
title: "${title}"
permalink: /links/${slug}/index.html
link: ${link}
date: ${postDate}
author: 
  name: ${authorName ? authorName : ''}
  web: ${domain}
  feed: ${feedUrl}
  mastodon: ${mastodonAccounts}
---`

    fs.writeFileSync(`${__siteroot}/src/links/${year}/${slugDate}-${slug}.md`, meta, { flag: "wx" })
}

/////////////////////////////////
///// Create Changelog //////////
/////////////////////////////////
const createChangelog = async () => {
    let existingProjects = JSON.parse(fs.readFileSync(`${__siteroot}/src/_data/site/projects.json`, 'utf8'))
    existingProjects = [
        {
            title: 'rknight.me',
            link: 'https://rknight.me',
        },
        ...existingProjects.current, 
        ...existingProjects.podcasts, 
        ...existingProjects.profile, 
        ...existingProjects.stjude
    ]

    const date = new Date().toISOString().split('T')[0]
    const project = await select({
        message: 'Select Project',
        choices: existingProjects.map((project, i) => {
            return {
                name: project.title,
                value: i,
                description: project.description,
            }
        }),
        pageSize: 15,
    })
    const type = await select({
        message: 'Select Type',
        choices: [
            {
                name: 'Feature',
                value: 'feature',
                description: 'A new feature',
            },
            {
                name: 'Fix',
                value: 'fix',
                description: 'A bug fix',
            },
            {
                name: 'Project',
                value: 'project',
                description: 'A new project',
            },
            {
                name: 'Retired',
                value: 'retired',
                description: 'Retire a project',
            },
        ],
    })
    const message = await input({ message: 'Changelog Message' })

    const title = existingProjects[project].title
    const link = existingProjects[project].link

    const output = `- [${title}](${link}) [${type}] ${message || ''}`
    const year = new Date().getFullYear()
    const clFile = `${__siteroot}/src/changelog/${year}/${date}.md`

    let content = null
    if (!fs.existsSync(clFile))
    {
        const title = `Changelog ${date}`
        const permalink = `/log/${date}/index.html`
        const entryDate = moment(date).toISOString()

        content = `---
title: ${title}
permalink: ${permalink}
date: ${entryDate}
---

${output}`
    } else {
        content = fs.readFileSync(clFile, 'utf8')
        content = `${content}\n${output}`
    }

    fs.writeFileSync(clFile, content, { flag: "w" })
}

program
    .command('run')
    .description('🧙‍♂️ run the site wizard')
    .action(() => runWizard())

program
    .command('post')
    .description('📝 Create a new post')
    .action(() => createPost())

program
    .command('post')
    .description('🔗 Create a new link')
    .action(() => createLink())

program
    .command('changelog')
    .description('🛠️ Create a new changelog entry')
    .action(() => createChangelog())

program.parse()