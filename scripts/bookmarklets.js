const fs = require('fs')
const { parseHTML } = require('linkedom')

const BOOKMARKLETS = [
    'new-link',
    'new-post',
    'cms-link',
]

const run = async () => {
    let links = []

    BOOKMARKLETS.forEach(b => {
        const html = fs.readFileSync(`./tmp/${b}.html`, 'utf-8')
        links.push(html.split('\n')[20])
    })

    const content = `---
title: Bookmarklets
subtitle: You found a secret page! There's nothing exciting here though, sorry.
permalink: /bookmarklets/index.html
layout: base
---

${links.join('\n')}
`

    fs.writeFileSync('./src/pages/bookmarklets.md', content)
}

run()