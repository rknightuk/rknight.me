const csv = require('csv-parser')
const fs = require('fs')
const https = require('https')

function run() {
    let results = []

    fs.createReadStream('./scripts/brickset/sets.csv')
    .pipe(csv())
    .on('data', (data) => {
        if (!data.Number)
        {
            return
        }

        const realSetNumber = data.Number.split('-')[0];

        results.push({
            id: realSetNumber,
            blId: data.Number,
            year: data.Year,
            title: data['Set name'],
            minifigs: data.Minifigs,
            pieces: data.Pieces,
            theme: data.Theme,
            subtheme: data.Subtheme,
            metadata: {
                bricklinked: data.Bricklinked === 'Yes',
                noMinifigs: data['No Minifigures'] === 'Yes',
                launch: data['Launch date'],
                exit: data['Exit date'],
                price: data['RRP (GBP)'],
            }
        })
    })
    .on('end', () => {
        const byTheme = {}
        const ids = []

        results = results.sort((a,b) => (`${a.year}-${a.title}` > `${b.year}-${b.title}`) ? 1 : ((`${b.year}-${b.title}` > `${a.year}-${a.title}`) ? -1 : 0))

        results.forEach(r => {
            if (!byTheme[r.theme]) byTheme[r.theme] = []
            byTheme[r.theme].push(r)
            ids.push(r.blId)
            if (!fs.existsSync(`./src/assets/lego/${r.blId}.jpg`))
            {
                console.log(`Downloading new file for ${r.blId} / ${r.title}`)
                const url = `https://images.brickset.com/sets/large/${r.blId}.jpg`

                https.get(url, (res) => {
                    const path = `./src/assets/lego/${r.blId}.jpg`
                    const filePath = fs.createWriteStream(path)
                    res.pipe(filePath)
                    filePath.on('finish',() => {
                        filePath.close()
                        console.log(`Download completed for ${r.blId} / ${r.title}`)
                    })
                })
            }
        })

        const themes = Object.keys(byTheme).sort()
        fs.writeFileSync('./src/_data/lego.json', JSON.stringify({
            themes: themes,
            sets: byTheme,
            count: {
                sets: results.length,
                themes: themes.length,
            }
        }, '', 2))
    })
}

run()
