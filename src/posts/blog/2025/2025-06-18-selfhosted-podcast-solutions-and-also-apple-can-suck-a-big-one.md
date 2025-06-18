---
title: "Self-Hosted Podcast Solutions and Also Apple Can Suck a Big One"
permalink: /blog/selfhosted-podcast-solutions-and-also-apple-can-suck-a-big-one/index.html
date: 2025-06-18T12:19:38.285Z
excerpt: "I looked into a couple of solutions ultimately realising what I want doesn't exist"
tags:
    - Apps
    - Podcasting
    - SelfHosted
---

Yesterday I [asked](https://rknight.me/notes/202506171340/) if anyone knew of an iOS podcast app that also had a self-hostable backend or one with a sanctioned API. I have two requirements I'm interested in:

1. A decent podcast experience. This is the "easy" bit. I want to subscribe, download new episodes, and listen to them.
2. An API to access my listening history. I'm doing this in a horrible way right now with Overcast, I would much prefer a proper API.

I got multiple suggestions which came down to two options: [Plex](https://www.plex.tv) with [Prologue](https://apps.apple.com/app/id1459223267) and [audiobookshelf](https://www.audiobookshelf.org) with either [one](https://apps.apple.com/us/app/shelfplayer/id6475221163) [of](https://apps.apple.com/us/app/plappa/id6475201956) [three](https://apps.apple.com/in/app/soundleaf/id6738635634) third party apps[^1].

Forgive me this sidebar about iOS web apps but this is usually a thing I would solve myself with a backend and a nice frontend built exactly as I want. I _could_ do that, except I need to download podcast episodes offline which you can't reliably do with webapps on iOS. From the [Podrain](https://github.com/podrain/podrain?tab=readme-ov-file#note-about-ios) readme:

>  iOS doesn't have enough storage for for downloading the audio files for offline listening

I dug a bit deeper on this and came across [this post on Tigren](https://www.tigren.com/blog/progressive-web-app-limitations/):

> Safari imposes a 50MB limit on cache storage for PWAs. This means your app can only store up to 50MB of data before hitting a hard stop, at which point you’ll be prompted to free up space.
>
> While local storage and IndexedDB might seem like alternatives, they come with their own quirks. Some sources suggest that IndexedDB might allow for more storage—up to 500MB or more, depending on the device’s available free disk space.
>
> However, this isn’t consistent, so developers need to test and verify the limits for their specific use cases.

That last sentence does not ~~spark joy~~ fill me with confidence. Apple have no incentive to make web apps better so I'm not holding out hope. Also, I absolutely will not jump through the hoops to make an iOS app, submit it, hope Apple keeps it there, and pay $100 a year for the privilege. 

So I need to rely on an existing iOS app and backend. I installed audiobookshelf on [my Coolify instance](https://7622.me) after working out [there's a bug with the latest version](https://github.com/coollabsio/coolify/issues/5992). I subscribed to a couple of podcasts and downloaded the latest episodes.

![The audiobookshelf interface showing two podcasts - The Lonely Island and Ruminate](https://cdn.rknight.me/site/2025/audiobookshelf.jpg "The audiobookshelf interface")

My first note was that to have an episode available it has to be downloaded. It makes sense in the context of what audiobookshelf is but it's not usually how dedicated podcast apps work — [Overcast](https://overcast.fm) doesn't download every episode to it's server only for it to be served up to a mobile app. Along with this downloading requirement comes another issue — to have a history of what I've listened to, I need to keep them downloaded.

> If you want to keep track of what episodes you have listened to but still delete the files, you will need to track this progress using an external utility.

If I was going to build a very basic podcast backend, I would store the following:

- Every episode that has been fetched - by "fetched" I mean new episodes since I subscribed, or ones I manually downloaded to whatever app I'm using. I would not download the episodes themselves
- Store the state on each episode - `played`, `inprogress`, `unplayed`, maybe some others

What occurred to me while using audiobookshelf is it (and the other suggestion of Plex) is designed to be a _library_ of audio books and podcasts but in most cases[^2] I don't need a full archive of every episode of a show. I just want to listen and then disregard the file — but I still care that I listened to it.

I tried out [Plappa](https://apps.apple.com/us/app/plappa/id6475201956) and [SoundLeaf](https://apps.apple.com/in/app/soundleaf/id6738635634) and they're both solid apps but I didn't go any further because of the downloading situation. I don't want, or need, an ever-expanding podcast library just for the sake of keeping my listening history. I might have another look at [Pocketcasts](https://pocketcasts.com) because I have a grandfathered lifetime membership and [they have an API](https://www.mikestreety.co.uk/blog/get-your-pocket-casts-data-using-the-unofficial-api-and-php/), albeit not "official".

[^1]: There is a first party app but it's in beta only and Apple don't allow just installing any app I want plus they call it "sideloading" instead of "installing" to make it sound scary
[^2]: There are [some](https://relay.fm/bionic) [exceptions](https://hellointernet.fm)