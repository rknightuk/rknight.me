const fetch = require('node-fetch')

module.exports = async function() {
    console.log("Fetching latest status")

    const res = await fetch('https://api.omg.lol/address/robb/statuses/')
    const status = await res.json()
    return status.response.statuses[0]
}
