import { input } from '@inquirer/prompts'
import fs from 'fs'
import moment from 'moment'
import utils from '../utils.js'

export default async (__siteroot) => {
    const project = await utils.selectProject(__siteroot, {
        title: 'rknight.me',
        link: 'https://rknight.me',
    })

    const date = new Date().toISOString().split('T')[0]
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

    const { title, link } = project

    const output = `- [${title}](${link}) [${type}] ${message || ''}`
    const year = new Date().getFullYear()
    const clFile = `${__siteroot}/src/posts/changelog/${year}/${date}.md`

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