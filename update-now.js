const fetch = require("node-fetch")
const fs = require('fs')

const { omglolkey } = JSON.parse(fs.readFileSync('./config.json'))
fs.readFile('./public/now.md', 'utf8', (err, data) => {
    fetch("https://api.omg.lol/address/robb/now", {
        method: 'post',
        headers: {
            Authorization: `Bearer ${omglolkey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: data,
            listed: 1,
        })
  })
    .then(res => res.json())
    .then(json => {
      console.log(json)
    })
})
