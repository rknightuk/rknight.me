const fs = require('fs')
const moment = require('moment')

const run = async () => {
    const changelog = fs.readFileSync('./src/_data/changelog.md', 'utf8').split('\n')

    const data = {}

    changelog.forEach(c => {
        const [date, title, type] = c.match(/[^[)]+(?=\])/g)

        const link = c.match(/[^()]+(?=\))/)[0]
        const description = c.split(`[${type}] `)[1]

        if (!data[date])
        {
            data[date] = {}
        }

        if (!data[date][title])
        {
            data[date][title] = {
                title: title,
                link: link,
                changes: [],
            }
        }

        let value = description ? description : ''
        value = value ? `[${type}] ${value}` : `[${type}] ${title}`
        data[date][title].changes.push(value)
    })

    Object.keys(data).forEach(date => {
        const title = `Project Changelog ${date}`
        const permalink = `/log/${date}/index.html`
        const entryDate = moment(date).toISOString()

        let content = `---
title: ${title}
permalink: ${permalink}
date: ${entryDate}
---
`
        Object.keys(data[date]).forEach(project => {
            content += `\n- [${project}](${data[date][project].link}) ${data[date][project].changes.length === 0 ? '(new project)\n' : '\n'}`
            content += data[date][project].changes.filter(c => c).map(c => `    - ${c}`).join('\n')
        })

        fs.writeFileSync(`./demochangelog/${moment(date).format('YYYY')}/${date}.md`, content)
    })
}

run()