const fetch = require("node-fetch");
const fs = require('fs');
const xml2Json = require('xml2json');

stripTags = (text) => {
  return text.replace(/<[^>]*>/g, '').replace(/\n\n/g, "\n").replace(/\n/g, " ")
}

module.exports = async function() {  
  const { microblogkey } = JSON.parse(fs.readFileSync('./config.json'))

  const reading = await fetch("http://micro.blog/books/bookshelves/6464", { headers: { Authorization: `Bearer ${microblogkey}` }})
    .then(res => res.json())
    .then(json => {
      return json.items
    })

  const photos = await fetch("https://toot.rknight.me/photos/index.json")
    .then(res => res.json())
    .then(json => {
      return json.items.slice(0, 5).map(p => {
        return {
           url: p.url,
           image: p.image,
        }
      })
    })

  const watched = await fetch("https://toot.rknight.me/categories/movies/feed.xml")
    .then(response => response.text())
    .then(str => xml2Json.toJson(str, { object: true }))
    .then(data => {
      return data.rss.channel.item.filter(p => p.description.includes('★')).slice(0, 5).map(w => {
        return {
          url: w.link,
          date: new Date(w.pubDate).toISOString().substring(0, 16).replace('T', ' '),
          summary: stripTags(w.description),
          sortDate: (new Date(w.pubDate)).getTime(),
        }
      })
    })

  const posts = await fetch("https://toot.rknight.me/feed.json")
    .then(res => res.json())
    .then(json => {
      return json.items.map(p => {
          const summary = stripTags(p.content_html)
          return {
            original_summary: p.content_html,
            html: p.content_html,
            url: p.url,
            title: p.title,
            summary: summary.length > 500 ? `${summary.slice(0, 500)}...` : summary,
            date: p.date_published.substring(0, 16).replace('T', ' '),
            tags: p.tags || [],
          }
        })
        .filter(p => {
          if (p.tags.includes('Movies') && p.original_summary.includes('★')) return false
          if (p.tags.includes('TV')) return false
          if (p.original_summary.includes('<img')) return false
          return true
        }).slice(0, 5)
    })

    return {
      posts,
      watched,
      photos,
      reading,
    }
};