const fs = require('fs')
const moment = require('moment')

const run = async () => {
    const changelog = fs.readFileSync('../src/_data/changelog.md', 'utf8').split('\n')

    const x = changelog.map(c => {
        const [date, title, type] = c.match(/[^[)]+(?=\])/g)
        const link = c.match(/[^()]+(?=\))/)[0]
        const description = c.split(`[${type}] `)[1]

        const data = {
            date: moment(date).toISOString(),
            title,
            link,
            type,
            description,
        }

//         {
//     date: '2024-01-07T00:00:00.000Z',
//     title: 'rknight.me',
//     link: 'https://rknight.me',
//     type: 'feature',
//     description: 'Styled RSS/Atom feeds'
//   }

        console.log(`---
        title: ${title}
        date: ${moment(date).toISOString()}
---`)

return data
    })

    console.log(x)
}

run()