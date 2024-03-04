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

    const lists = {
      battleLines: {
        name: 'Battle Lines Variants',
        issues: [],
      },
      hipHop: {
        name: 'Hip-Hop Variants',
        issues: [],
      },
      nakayama: {
        name: 'David Nakayama Variants',
        issues: [],
      },
      xmenblack: {
        name: 'X-Men Black Mugshot Variants',
        issues: [],
      },
      actionFigure: {
        name: 'Action Figure Variants',
        issues: [],
      },
      whatIf: {
        name: 'What If?',
        issues: [],
      },
      trueBelievers: {
        name: 'True Believers Reprints',
        issues: [],
      },
      womensHistory: {
        name: 'Jen Bartel Women\'s History Month Variants',
        issues: [],
      }
    }

    const keyedSeries = {
      'orphaned': {
        name: 'Omnibuses, One-Shots, and Annuals',
        trades: [],
        issues: [],
        omnis: [],
      }
    }
    const counts = {
        trades: 0,
        issues: 0,
        omnis: 0,
    }
    const seriesCollection = await fetchCollection(USER_ID, CollectionTypes.Series, {
        sort: SortTypes.AlphaAsc
    })
    seriesCollection.forEach(series => {
      keyedSeries[series.name] = {
        ...series,
        trades: [],
        issues: [],
        omnis: [],
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

      let collectionKey = issue.name.endsWith(' TP') ? 'trades' : 'issues'
      if (issue.name.includes('Omnibus')) {
        collectionKey = 'omnis'
      }
      counts[collectionKey]++
      let nameKey = 'orphaned'

      if (keyedSeries[name]) {
        nameKey = name
      } else if (keyedSeries[name2]) {
        nameKey = name2
      } else if (keyedSeries[name3]) {
        nameKey = name3
      }

      keyedSeries[nameKey][collectionKey].push(issue)

      if (issue.name.includes('Battle Lines')) lists.battleLines.issues.push(issue)
      if (issue.name.includes('Hip-Hop')) lists.hipHop.issues.push(issue)
      if (issue.name.includes('Nakayama')) lists.nakayama.issues.push(issue)
      if (issue.name.includes(' Mugshot')) lists.xmenblack.issues.push(issue)
      if (issue.name.includes('Action Figure')) lists.actionFigure.issues.push(issue)
      if (issue.name.includes('What If')) lists.whatIf.issues.push(issue)
      if (issue.name.includes('True Believers')) lists.trueBelievers.issues.push(issue)
      if (issue.name.includes('Women\'s History')) lists.womensHistory.issues.push(issue)
    })

    fs.writeFileSync(`${__siteroot}/src/_data/catalog/comics.json`, JSON.stringify({
      data: Object.values(keyedSeries).filter(series => series.issues.length + series.trades.length > 1),
      single: Object.values(keyedSeries).filter(series => series.issues.length + series.trades.length === 1).map(s => {
        return {
          ...s,
          entry: {
            ...s.issues[0],
            ...s.trades[0],
            ...s.omnis[0],
          }
        }
      }),
      lists: Object.values(lists),
      counts,
    }, null, 2), { flag: "w" })
}