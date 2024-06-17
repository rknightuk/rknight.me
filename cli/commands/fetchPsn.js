import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

import Module from 'node:module';
const require = Module.createRequire(import.meta.url);
const { exchangeNpssoForCode, exchangeCodeForAccessToken, getUserTitles } = require('psn-api')

export default async (__siteroot) => {
    const accessCode = await exchangeNpssoForCode(process.env.PSN_KEY);
	const authorization = await exchangeCodeForAccessToken(accessCode);

    let titles = await getUserTitles({ accessToken: authorization.accessToken }, 'me', { limit: 800, offset: 0 })

    const data = {
        PS5: {},
        PS4: {},
        PS3: {},
    }
    
    titles.trophyTitles.forEach(t => {
        const titleMatch = t.trophyTitleName.replace(/[^0-9A-Z]+/gi,"").toLowerCase()
        data[t.trophyTitlePlatform][titleMatch] = {
            titleRaw: t.trophyTitleName,
            progress: t.progress,
            platform: t.trophyTitlePlatform,
            earned: t.earnedTrophies,
        }
    })

    fs.writeFileSync(`${__siteroot}/src/_data/catalog/trophies.json`, JSON.stringify(data, null, 2), { flag: "w" })

    
}