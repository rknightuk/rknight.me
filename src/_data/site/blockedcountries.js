import fetch from "node-fetch"
import { AssetCache } from "@11ty/eleventy-fetch"

export default (async function () {
    console.log("Fetching blocked_countries")
    
    let asset = new AssetCache("blocked_countries")
    
    if (asset.isCacheValid('7d')) {
        console.log("Returning blocked_countries from cache")
        return await asset.getCachedValue()
    }
    
    const countries = ['cn', 'kp']
    let ipRanges = []

    for (let i = 0; i < countries.length; i++) {
        const res = await fetch(`https://www.ipdeny.com/ipblocks/data/aggregated/${countries[i]}-aggregated.zone`)
    
        let txt = await res.text()

        ipRanges.push(...txt.split("\n").filter(line => line.trim() !== ""))
    }

    ipRanges = ipRanges.join("\n")

    await asset.save(ipRanges, "json")

    return ipRanges
})
