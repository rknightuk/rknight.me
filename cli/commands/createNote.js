import { input } from '@inquirer/prompts'
import fs from 'fs'

export default async (__siteroot) => {
    const content = await input({ message: 'Content' })

    const slug = `${new Date().toISOString().split('T')[0]}-${new Date().toISOString().split('T')[1].slice(0, 5).replace(':', '-')}`.replaceAll('-', '')
    const year = new Date().getFullYear()
    const postDate = new Date().toISOString()

    let meta = `---
permalink: /note/${slug}/index.html
date: ${postDate}
---

${content}
`

    fs.writeFileSync(`${__siteroot}/src/posts/notes/${year}/${slug}.md`, meta, { flag: "wx" })
}