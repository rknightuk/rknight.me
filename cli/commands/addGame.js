import { input } from '@inquirer/prompts'
import fs from 'fs'
import https from 'https'
import sharp from 'sharp'
import open from 'open'
import utils from '../utils.js'

export default async (__siteroot) => {
    const PLATFORMS = {
        10: 'PS1',
        5869: 'PS2',
        12: 'PS3',
        4919: 'PS4',
        4980: 'PS5',
        4920: 'Xbox One',
        15: 'Xbox 360',
        14: 'Xbox',
        4971: 'Switch',
        9: 'Wii',
        4912: '3DS',
        2: 'GameCube',
        3: 'N64',
        35: 'Master System',
    }

    const search = await input({ message: 'Search' })

    await open(`https://thegamesdb.net/search.php?name=${search}`)

    const link = await input({ message: 'Link' })
    const id = link.split('id=')[1]
    const imageUrl = `https://cdn.thegamesdb.net/images/thumb/boxart/front/${id}-1.jpg`

    const document = await utils.fetchPageHtml(link)

    const title = document.querySelector('h1').textContent
    const platformId = document.querySelector('a[href*="/platform.php"]').href.split('id=')[1]
    const platformName = PLATFORMS[platformId]

    let games = JSON.parse(fs.readFileSync(`${__siteroot}/src/_data/catalog/games.json`, 'utf8'))
    const newGame = {
        gameID: parseInt(id, 10),
        title: title,
    }

    games.games[platformName].push(newGame)

    https.get(imageUrl, (res) => {
        const path = `${__siteroot}/src/assets/catalog/games/${id}.jpg`
        const tempPath = `${__siteroot}/src/assets/catalog/games/${id}-tmp.jpg`
        const filePath = fs.createWriteStream(tempPath)
        res.pipe(filePath)
        filePath.on('finish',() => {
            filePath.close()
            sharp(tempPath)
                .toFile(path)
                .then(() => {
                    fs.unlinkSync(tempPath)
                    fs.writeFileSync(`${__siteroot}/src/_data/catalog/games.json`, JSON.stringify(games, null, 2), { flag: "w" })
                    console.log(`✅ Added ${newGame.title} to ${platformName}`)
                })
        })
    })
}