import fs from 'fs'

const run = async () => {
    const raw = await fetch('https://app.crucialtracks.org/profile/rknightuk/feed.json')
    const data = await raw.json()

    data.items.forEach(item => {
        const links = [
            item.url,
            item._song_details.apple_music_url,
            item._song_details.songlink_url,
        ].filter(l => l)

        const content = `---
title: "Crucial Track: ${item._song_details.song} by ${item._song_details.artist}"
date: ${item.date_published.replace('000000Z', '000Z')}
permalink: /almanac/music/ct${item.url.split('/').pop()}/index.html
links: [${links.map(link => `'${link}'`).join(', ')}]
poster: ${item._song_details.artwork_url}
artist: ${item._song_details.artist}
song: ${item._song_details.song}
---

${item._song_details.content}
` 

        fs.writeFileSync(`../src/posts/almanac/music/2025/ct${item.url.split('/').pop()}.md`, content, 'utf8')
    });

    
}

run()