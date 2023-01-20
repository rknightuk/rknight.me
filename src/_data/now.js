const fetch = require('node-fetch')

module.exports = async function() {
    const status = await fetch('https://api.omg.lol/address/robb/statuses/')
        .then(res => res.json())
        .then(json => {
            return json.response.statuses[0]
        })

    const content = await fetch('https://api.rknight.me/api/now-web.txt')
        .then(res => res.text())
        .then(text => {
            return text
        })

    return {
        status,
        content,
    }
}
