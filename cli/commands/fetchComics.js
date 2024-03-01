import fs from 'fs'
import {
    CollectionTypes,
    fetchCollection,
    SortTypes,
} from '../comicgeeks/dist/index.js'
import dotenv from 'dotenv'
dotenv.config()

export default async (__siteroot) => {
    const USER_ID = 390396

    const keyedSeries = {}
    const counts = {
        trades: 0,
        issues: 0,
    }
    const seriesCollection = await fetchCollection(USER_ID, CollectionTypes.Series, {
        sort: SortTypes.AlphaAsc
    })
    seriesCollection.forEach(series => {
      keyedSeries[series.name] = {
        ...series,
        trades: [],
        issues: [],
      }
    });

    const issueCollection = await fetchCollection(USER_ID, CollectionTypes.Issue, {
        sort: SortTypes.AlphaAsc
    })
    issueCollection.forEach(issue => {
      let name = issue.name.split(' #')[0].trim()
      let name2 = issue.name.split(' Vol.')[0].trim()
      let name3 = issue.name.split(' TP')[0].trim()
      if (name.startsWith('Horizon Zero Dawn: Liberation')) {
        name = 'Horizon: Zero Dawn - Liberation'
      } else if (name.startsWith('Horizon Zero Dawn')) {
        name = 'Horizon: Zero Dawn'
      }

      const collectionKey = issue.name.endsWith(' TP') ? 'trades' : 'issues'
      counts[collectionKey]++
      let nameKey = null

      if (keyedSeries[name]) {
        nameKey = name
      } else if (keyedSeries[name2]) {
        nameKey = name2
      } else if (keyedSeries[name3]) {
        nameKey = name3
      }

      if (nameKey) {
        keyedSeries[nameKey][collectionKey].push(issue)
      } else {
        console.log(`No series found for ${issue.name}`)
      }
      
    })

    fs.writeFileSync(`${__siteroot}/src/_data/catalog/comics.json`, JSON.stringify({
      data: Object.values(keyedSeries).filter(series => series.issues.length + series.trades.length > 1),
      single: Object.values(keyedSeries).filter(series => series.issues.length + series.trades.length === 1),
      counts,
    }, null, 2), { flag: "w" })
}