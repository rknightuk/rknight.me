const fs = require('fs')

const people = JSON.parse(fs.readFileSync('./src/_data/people.json'))

let data = ``
Object.values(people).map((p) => {
    data = data + `
author: 
  name: ${p.name}
  web: ${p.web}
  feed: ${p.feed}
  mastodon: ${p.mastodon}`
})

console.log(data)