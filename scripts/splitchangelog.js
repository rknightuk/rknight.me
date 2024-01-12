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
            data[date] = []
        }

        data[date].push(
            `[${title}](${link}) [${type}] ${description || ''}`
        )
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

        content += data[date].map(c => `- ${c}`).join('\n')

        fs.writeFileSync(`./demochangelog/${moment(date).format('YYYY')}/${date}.md`, content)
    })
}

run()