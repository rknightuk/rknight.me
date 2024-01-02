---
title: "Pokédon: Read Mastodon on a Pokédex"
permalink: /blog/pokedon-read-mastodon-on-a-pokedex/index.html
date: 2023-11-18T19:32:15.071Z
excerpt: "A Mastodon client in a Pokédex I built at a hackathon today"
layout: post
tags:
  - ActivityPub
  - Mastodon
  - SocialMedia
  - Development
  - Hackathon
project: https://pokedon.rknight.me
---

Today, I attended a casual no-official-name hackathon. Just a bunch of people working on silly projects. It _did_ have a theme though: silly interfaces. I spent the first hour before I arrived thinking of a few ideas until I thought of the perfect thing: a Mastodon client but it's in a Pokédex.

[Try it out here](https://pokedon.rknight.me).

![Pokédon interface](https://rknightuk.s3.amazonaws.com/site/pokedon.png)

It's fairly limited but you can:

- Sign into your instance
- View your timeline
- Navigate with the keyboard (up/down for newer/older toots)
- Listen to a toot with the [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

The Mastodon OAuth process is handled by [Laravel Socialite](https://laravel.com/docs/10.x/socialite) and [this Mastodon socialite provider](https://github.com/kawax/socialite-mastodon) which has excellent examples in the readme enabling me to have this up and running in under an hour. Interacting with the Mastodon API is done with [`kawax/laravel-mastodon-api`](https://github.com/kawax/laravel-mastodon-api) by the same author.

The SpeechSynthesis API allows you to do text to speech in the browser. For this project I used the `speak` method as well as two events of [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance): `end` and `boundary`:

```js

// text to speech
let msg = new SpeechSynthesisUtterance()
msg.text = 'Hello'
window.speechSynthesis.speak(msg)

msg.addEventListener('end', (event) => {
    // do something
})
```

To get the text to output as it's spoken, I took the text, split it on a blank space, then slice the array and join again and then put that back in the element after each `boundary` event. This isn't the best way as it removes any HTML like links. I'd be interested in a reliable way to do this while keeping the HTML in tact.

```js
const toot = document.getElementById('#toot')
const content = toot.innerText
const tootWords = content.split(' ')
let currentBoundary = 0

msg.addEventListener('boundary', (event) => {
    currentBoundary++
    toot.innerHTML = `<p>${tootWords.slice(0, currentBoundary).join(' ')}</p>`
})
```

To make Professor Oak slide up when talking, I used CSS transitions on the height of the element:

```css
.poak {
    position: absolute;
    bottom: -5px;
    left: 75px;
    height: 230px;
    overflow: hidden;
    transition: all 1s;
}

.poak.close {
    height: 0;
}
```

Things it doesn't do right now:

- ~~Be responsive. I just didn't have time today.~~ Done 2023-11-21
- Allow boosting and favouriting.
- Allow you to pause audio.
- View followers
- View your activity

I will probably come back to this at some point and add some of these features but as it is I'm pretty happy with this as a day's project.

Credit for the name goes to [Zoe](https://zoeaubert.me).

Fonts used:

- [PKMN RBYGSC Font](https://www.dafont.com/pkmn-rbygsc.font) for the text on the screens
- [Pokémon Font](https://www.dafont.com/pokemon.font) for the logo
- [Atkinson Hyperlegible Font](https://brailleinstitute.org/freefont) for the body text

