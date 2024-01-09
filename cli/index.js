import { program } from 'commander'
import select from '@inquirer/select'
import { input } from '@inquirer/prompts'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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

    const meta = `---
title: "${title}"
permalink: /blog/${slug}/index.html
date: ${postDate}
excerpt: ""
layout: post
tags:
---`

    fs.writeFileSync(`${__siteroot}/src/posts/${year}/${slugDate}-${slug}.md`, meta, { flag: "wx" })
}

/////////////////////////////////
//////// Create Link ////////////
/////////////////////////////////
const createLink = async () => {
    const link = await input({ message: 'Link' })

    console.log('Fetching link title...')

    let page = await fetch(link)
    page = await page.text()

    let title = page.match(/<title[^>]*>([^<]+)<\/title>/)[1]
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
---`

    fs.writeFileSync(`${__siteroot}/src/links/${year}/${slugDate}-${slug}.md`, meta, { flag: "wx" })
}

const createChangelog = async () => {
    let changelog = fs.readFileSync(`${__siteroot}/src/_data/changelog.md`, 'utf8')
    let existingProjects = JSON.parse(fs.readFileSync(`${__siteroot}/src/_data/projects.json`, 'utf8'))
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


    changelog = `[${date}] [${title}](${link}) [${type}] ${message || ''}\n${changelog}`

    fs.writeFileSync(`${__siteroot}/src/_data/changelog.md`, changelog, { flag: "w" })
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