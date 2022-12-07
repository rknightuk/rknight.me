const fetch = require("node-fetch");

module.exports = async function() {
  console.log( "Fetching Micro.blog posts" );

  return fetch("https://toot.rknight.me/feed.json")
    .then(res => res.json())
    .then(json => {
      return {
        posts: json.items.slice(0, 5).map(p => {
          const summary = p.content_html.replace(/<[^>]*>/g, '').replace(/\n\n/g, "\n").replace(/\n/g, " ")
          return {
            html: p.content_html,
            url: p.url,
            title: p.title,
            summary: summary.length > 500 ? `${summary.slice(0, 500)}...` : summary,
            date: p.date_published.substring(0, 16).replace('T', ' '),
          }
        }),
      };
    });
};