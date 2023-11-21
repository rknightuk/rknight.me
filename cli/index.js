import { program } from 'commander'
import select from '@inquirer/select'
import { input } from '@inquirer/prompts'
import chalk from 'chalk'
import fs from 'fs'

if (process.argv.slice(2).length === 0) {
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
}

program
    .command('new <title>')
    .description('Create a new post')
    .action((_title) => {
        const title = program.args.join(' ')
        const slug = title.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-')
        const slugDate = new Date().toISOString().split('T')[0]
        const year = new Date().getFullYear()
        const postDate = new Date().toISOString()

        const meta = `---
title: ${title}
permalink: /${slug}/index.html
date: ${postDate}
excerpt: ""
layout: post
---`

    fs.writeFileSync(`../src/posts/${year}/${slugDate}-${slug}.md`, meta, { flag: "wx" })

    })

program
    .command('changelog')
    .description('Create a new changelog entry')
    .action(async () => {
        let changelog = fs.readFileSync('../src/_data/changelog.md', 'utf8')
        let existingProjects = JSON.parse(fs.readFileSync('../src/_data/projects.json', 'utf8'))
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

        fs.writeFileSync('../src/_data/changelog.md', changelog, { flag: "w" })
    })


program.parse()