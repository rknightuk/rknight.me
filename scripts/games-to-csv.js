import fs from 'fs'
import { generate, parse, transform, stringify } from 'csv/sync'

const gamesJson = JSON.parse(fs.readFileSync('../src/_data/catalog/games.json')).games

const columns = [
    'id',
    'title',
    'platform',
]
const rows = []

Object.keys(gamesJson).forEach((platformId) => {
    const games = gamesJson[platformId]
    games.forEach((game) => {
        let title = game.title
        if (title.startsWith('The ')) {
            title = title.substring(4) . concat(', The')
        }
        rows.push([
            game.gameID,
            title,
            platformId,
        ])
    })
})

rows.sort((a, b) => {
    const platformandtitle = a[2].toLowerCase() + a[1].toLowerCase()
    const platformandtitleB = b[2].toLowerCase() + b[1].toLowerCase()
    if (platformandtitle < platformandtitleB) {
        return -1
    }
    if (platformandtitle > platformandtitleB) {
        return 1
    }
    return 0
})

const output = stringify(rows, { header: true, columns: columns })
const outputFile = '../src/_data/catalog/games.csv'
fs.writeFileSync(outputFile, output)



// console.log()