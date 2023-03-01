const csv = require('csv-parser')
const fs = require('fs')
const https = require('https')

function run() {
    let results = []

    fs.createReadStream('./scripts/brickset/minifigs.csv')
    .pipe(csv())
    .on('data', (data) => {
        if (data.OwnedLoose === '0' || !data.MinifigName)
        {
            return
        }

        results.push({
            id: data.MinifigNumber,
            name: data.MinifigName,
            category: data.MinifigCategory,
        })
    })
    .on('end', () => {
        results = results.sort((a,b) => (`${a.category}-${a.name}` > `${b.category}-${b.name}`) ? 1 : ((`${b.category}-${b.name}` > `${a.category}-${a.name}`) ? -1 : 0))

        results.forEach(r => {
            if (!fs.existsSync(`./src/assets/lego/figs${r.id}.png`))
            {
                console.log(`Downloading new file for ${r.id} / ${r.name}`)
                const url = `https://img.bricklink.com/ItemImage/MN/0/${r.id}.png`

                https.get(url, (res) => {
                    const path = `./src/assets/lego/figs/${r.id}.jpg`
                    const filePath = fs.createWriteStream(path)
                    res.pipe(filePath)
                    filePath.on('finish',() => {
                        filePath.close()
                        console.log(`Download completed for ${r.id} / ${r.name}`)
                    })
                })
            }
        })

        fs.writeFileSync('./src/_data/minifigs.json', JSON.stringify(results, '', 2))
    })
}

run()
