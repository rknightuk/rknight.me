import fs from 'fs'

const run = async () => {
    const raw = await fetch('https://app.crucialtracks.org/profile/rknightuk/feed.json')
    const data = await raw.json()

    data.items.forEach(item => {
        let content = `---
title: "Crucial Track: ${item._song_details.song} by ${item._song_details.artist}"
date: ${item.date_published.replace('000000Z', '000Z')}
permalink: /almanac/music/ct${item.url.split('/').pop()}/index.html
artist: ${item._song_details.artist}
song: ${item._song_details.song}
link: ${item.url}
link_am: ${item._song_details.apple_music_url || ''}
link_sl: ${item._song_details.songlink_url || ''}
poster: ${item._song_details.artwork_url || ''}
---

${item._song_details.content}
` 

        fs.writeFileSync(`../src/posts/almanac/music/${item.date_published.split('-')[0]}/ct${item.url.split('/').pop()}.md`, content, 'utf8')
    });

    
}

run()