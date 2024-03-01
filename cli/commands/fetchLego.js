import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

export default async (__siteroot) => {
    const { BRICKSET_USERNAME, BRICKSET_PASSWORD, BRICKSET_API_KEY } = process.env
    const response = await fetch(`https://brickset.com/api/v3.asmx/login?apiKey=${BRICKSET_API_KEY}&username=${BRICKSET_USERNAME}&password=${BRICKSET_PASSWORD}`);
    const body = await response.json();

    if (!response.ok) return

    const userHash = body.hash

    const setResponse = await fetch(`https://brickset.com/api/v3.asmx/getSets?apiKey=${BRICKSET_API_KEY}&userHash=${userHash}&params={"owned":1,"pageSize":500,"orderBy":"YearFrom","orderBy":"Theme"}`)
    const rawData = await setResponse.json()

    const data = {
        count: {
            sets: rawData.sets.length,
            themes: 0,
            pieces: 0,
        },
        themes: [],
        sets: {},
        minifigures: {
            'loose': [],
            'sets': [],
        },
    }

    for (const set of rawData.sets) {
        if (!data.sets[set.theme])
        {
            data.sets[set.theme] = []
            data.themes.push(set.theme)
        }

        data.count.pieces += set.pieces

        data.sets[set.theme].push({
            id: set.number,
            title: set.name,
            year: set.year,
            pieces: set.pieces,
            image: set.image.thumbnailURL,
            url: set.bricksetURL,
        })
    }

    data.count.themes = Object.keys(data.themes).length

    const minifigResponse = await fetch(`https://brickset.com/api/v3.asmx/getMinifigCollection?apiKey=${BRICKSET_API_KEY}&userHash=${userHash}&params={"owned":1}`)
    const minifigData = await minifigResponse.json()

    for (const minifig of minifigData.minifigs) {
        data.minifigures[minifig.ownedLoose === 1 ? 'loose' : 'sets'].push({
            id: minifig.minifigNumber,
            name: minifig.name,
            theme: minifig.category,
            image: `https://img.bricklink.com/ItemImage/MN/0/${minifig.minifigNumber}.png`
        })
    }

    fs.writeFileSync(`${__siteroot}/src/_data/catalog/lego.json`, JSON.stringify(data, null, 2), { flag: "w" })
}