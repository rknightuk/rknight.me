import fs from 'fs'
import https from 'https'
import sharp from 'sharp'
import dotenv from 'dotenv'
dotenv.config()

export default async (__siteroot) => {
    const IMAGE_SET_PATH = 'https://images.brickset.com/sets/small/'
    const IMAGE_FIG_PATH = 'https://img.bricklink.com/ItemImage/MN/0/'
    const LOCAL_IMAGE_SET_PATH = `${__siteroot}/src/assets/catalog/lego/sets/`
    const LOCAL_IMAGE_FIG_PATH = `${__siteroot}/src/assets/catalog/lego/figs/`

    const { BRICKSET_USERNAME, BRICKSET_PASSWORD, BRICKSET_API_KEY } = process.env
    const response = await fetch(`https://brickset.com/api/v3.asmx/login?apiKey=${BRICKSET_API_KEY}&username=${BRICKSET_USERNAME}&password=${BRICKSET_PASSWORD}`);
    const body = await response.json();

    if (!response.ok) return

    const userHash = body.hash

    const setResponse = await fetch(`https://brickset.com/api/v3.asmx/getSets?apiKey=${BRICKSET_API_KEY}&userHash=${userHash}&params={"owned":1,"pageSize":500,"orderBy":"YearFrom","orderBy":"Theme"}`)
    const rawData = await setResponse.json()

    const setIds = []
    const figIds = []

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
    
        const imageId = set.image.thumbnailURL.replace(IMAGE_SET_PATH, '').replace('.jpg', '')

        data.sets[set.theme].push({
            id: set.number,
            title: set.name,
            year: set.year,
            pieces: set.pieces,
            image: set.image.thumbnailURL,
            imageId,
            url: set.bricksetURL,
        })

        setIds.push(imageId)
    }

    data.count.themes = Object.keys(data.themes).length

    const minifigResponse = await fetch(`https://brickset.com/api/v3.asmx/getMinifigCollection?apiKey=${BRICKSET_API_KEY}&userHash=${userHash}&params={"owned":1}`)
    const minifigData = await minifigResponse.json()

    for (const minifig of minifigData.minifigs) {
        data.minifigures[minifig.ownedLoose === 1 ? 'loose' : 'sets'].push({
            id: minifig.minifigNumber,
            name: minifig.name,
            theme: minifig.category,
            image: `${IMAGE_FIG_PATH}${minifig.minifigNumber}.png`
        })

        figIds.push(minifig.minifigNumber)
    }

    for (const setId of setIds) {
        if (!fs.existsSync(`${LOCAL_IMAGE_SET_PATH}${setId}.jpg`)) {
            console.log('image does not exist ' + setId)
            const imageUrl = `${IMAGE_SET_PATH}${setId}.jpg`
            https.get(imageUrl, (res) => {
                const path = `${LOCAL_IMAGE_SET_PATH}${setId}.jpg`
                const tempPath = `${LOCAL_IMAGE_SET_PATH}${setId}-tmp.jpg`
                const filePath = fs.createWriteStream(tempPath)
                res.pipe(filePath)
                filePath.on('finish',() => {
                    filePath.close()
                    sharp(tempPath)
                        .toFile(path)
                        .then(() => {
                            fs.unlinkSync(tempPath)
                        })
                })
            })
        }
    }

    for (const figId of figIds) {
        if (!fs.existsSync(`${LOCAL_IMAGE_FIG_PATH}${figId}.jpg`)) {
            console.log('image does not exist ' + figId)
            const imageUrl = `${IMAGE_SET_PATH}${figId}.png`
            https.get(imageUrl, (res) => {
                const path = `${LOCAL_IMAGE_FIG_PATH}${figId}.jpg`
                const tempPath = `${LOCAL_IMAGE_FIG_PATH}${figId}-tmp.jpg`
                const filePath = fs.createWriteStream(tempPath)
                res.pipe(filePath)
                filePath.on('finish',() => {
                    filePath.close()
                    sharp(tempPath)
                        .toFile(path)
                        .then(() => {
                            fs.unlinkSync(tempPath)
                        })
                })
            })
        }
    }

    fs.writeFileSync(`${__siteroot}/src/_data/catalog/lego.json`, JSON.stringify(data, null, 2), { flag: "w" })
}