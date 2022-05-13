---
title: Get Safari Tabs Shortcut
permalink: /get-safari-tabs-shortcut/index.html
date: 2022-05-13
excerpt: "My MacStories Automation April entry"
tags:
layout: post
---

For [Automation April](https://www.macstories.net/stories/introducing-automation-april/) MacStories ran a [contest](https://www.macstories.net/stories/introducing-the-2022-automation-april-shortcuts-contest-winners/) where people could submit a shortcut and be in with a chance of winning an Analogue Pocket and a Stream Deck.

Until the announcement of the contest I had never made a shortcut but I wanted to enter just for the fun of it (and that sweet role icon [in the members Discord](http://plus.club)). I decided to convert my existing [_Get Safari Tabs_ Alfred workflow](https://rknight.me/alfred-workflows/#085F8761-9FB4-492D-B466-D7CE943DCE60) to a shortcut.

The shortcut gets all currently open tabs in Safari and converts them into one of 6 formats and then copies them to the clipboard

- Markdown list: `- [Robb Knight](https://rknight.me)`
- Markdown links: `[Robb Knight](https://rknight.me)`
- Links only: `https://rknight.me`
- Titles only `Robb Knight`
- Titles with links `Robb Knight https://rknight.me`

I use the workflow, and now the shortcut, fairly regularly for making [shownotes for Ruminate](https://ruminatepodcast.com) and for adding links to [the Intersect](https://intersect.rknight.me).

The shortcut is MacOS only because it uses [JXA](https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/Introduction.html#//apple_r) to get the current tabs and formatting them. I'm sure this could be done with shortcut actions but I already had the existing logic from the workflow and I couldn't see any advantage in converting the logic to actions.

[Download Get Safari Links Shortcut for MacOS](https://www.icloud.com/shortcuts/bfe5827f709a47909e6e81d098d5e507)