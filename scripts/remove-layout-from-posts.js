const glob = require('glob').glob
const fs = require('fs')
const moment = require('moment')

const run = async () => {
    const files = await glob('./src/posts/blog/**/*.md')

    files.forEach(page => {
        const path = page
        const originalContent = fs.readFileSync(page, 'utf8').split('\n').filter(line => line !== 'layout: post').join('\n')

        fs.writeFileSync(path, originalContent, 'utf8')

        // const originalDate = originalContent.match(/^layout: ?(.*$)/gm)[0].trim()
        // let newDate = `${originalDate}T00:00:00.000Z`

        // if (originalDate.endsWith('Z')) {
        //     // ignore
        //     return
        // }

        // if (originalDate.length > 16)
        // {
        //     newDate = `date: ${moment(originalDate.replace('date: '), 'YYYY-MM-DD HH:mm').toISOString()}`
        // }

        // const newContent = originalContent.replace(originalDate, newDate)
        // fs.writeFileSync(path, newContent, 'utf8')
    })
}

run()