const fetch = require("node-fetch");

module.exports = async function() {
  console.log( "Fetching Micro.blog posts" );

  return fetch("https://toot.rknight.me/feed.json")
    .then(res => res.json())
    .then(json => {
      return {
        posts: json.items.slice(0, 5).map(p => {
          return {
            html: p.content_html,
            url: p.url,
            title: p.title,
            date: p.date_published.substring(0, 16).replace('T', ' '),
          }
        }),
      };
    });
};