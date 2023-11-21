// x.split(' ').slice(0, 2) // date and tag
// x.split(' ').slice(2) // content
// extract links with markdown link extractor for filters/tags

const fs = require('fs')

module.exports = () => {
    const changelog = fs.readFileSync('./src/_data/changelog.md', 'utf8').split('\n')

    return changelog.map(c => {
        const [date, title, type] = c.match(/[^[)]+(?=\])/g)
        const link = c.match(/[^()]+(?=\))/)[0]
        const description = c.split(`[${type}] `)[1]

        return {
            date,
            title,
            link,
            type,
            description,
        }
    })
}