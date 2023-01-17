const fetch = require('node-fetch')
const jsYaml = require('js-yaml')
const fs = require('fs')
const marked = require('marked')

module.exports = async function() {
    const { microblogkey, lastfmkey } = JSON.parse(fs.readFileSync('./config.json'))

    const status = await fetch('https://api.omg.lol/address/robb/statuses/')
        .then(res => res.json())
        .then(json => {
            return json.response.statuses[0]
        })

    const reading = await fetch('http://micro.blog/books/bookshelves/6464', { headers: { Authorization: `Bearer ${microblogkey}` }})
        .then(res => res.json())
        .then(json => {
            return json.items
        })

    const listsToHtml = (data) => {
        return data.map(m => {
            return `<li>${marked.parse(m).replaceAll('<p>', '').replaceAll('</p>', '')}</li>`
        }).join('\n')
    }

    const now = await fetch('https://api.omg.lol/address/robb/pastebin/now.yaml')
        .then(res => res.json())
        .then(json => {
            let nowdata = jsYaml.load(json.response.paste.content.replace(/{[^}]*}/g, ""))
            Object.keys(nowdata).forEach(key => {
                nowdata[key] = listsToHtml(nowdata[key])
            })
            return nowdata
        })

    const music = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=rknightuk&api_key=${lastfmkey}&format=json&period=7day`)
        .then(res => res.json())
        .then(json => {
            return json.topalbums.album.slice(0, 5).map(a => {
                return {
                    title: a.name,
                    artist: a.artist.name,
                    link: a.url,
                    art: a.image.pop()['#text'] === '' ? null : a.image.pop()['#text']
                }
            })
        })

    return {
        status,
        reading,
        now,
        music,
    }
}
