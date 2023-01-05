const fetch = require("node-fetch");

module.exports = async function() {
  console.log( "Fetching Latest Status" );

  return fetch("https://api.omg.lol/address/robb/statuses/")
    .then(res => res.json())
    .then(json => {
      return json.response.statuses;
    });
};
