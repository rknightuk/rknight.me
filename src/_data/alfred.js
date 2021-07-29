const fetch = require("node-fetch");

module.exports = async function() {
  console.log( "Fetching Alfred Workflows" );

  return fetch("https://raw.githubusercontent.com/rknightuk/alfred-workflows/main/api.json")
    .then(res => res.json())
    .then(json => {
      return {
        workflows: json,
      };
    });
};