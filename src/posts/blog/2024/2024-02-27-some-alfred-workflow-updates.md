---
title: "Some Alfred Workflow Updates"
permalink: /blog/some-alfred-workflow-updates/index.html
date: 2024-02-27T14:44:09.243Z
excerpt: "A few updates and changes to my Alfred workflows"
tags:
    - Alfred
    - MacOS
    - Development
---

I use, and make, [a lot of Alfred Workflows](/alfred-workflows). Some of them I rely on every day, some only come in handy on occasion, and sometimes I build something then realise I actually don't need it. I've spent some time the past week sorting out some lingering problems with a couple of them, looking into the [filed issues on GitHub](https://github.com/rknightuk/alfred-workflows/issues), and deciding to archive one that I don't use and also don't have time to update.

### Agenda

Agenda was a big project I was _very_ into when I was working on it then I just...didn't use it. It uses an unsigned binary because I'm not paying Apple $100 to sign it. It has permission errors in some scenarios, timezones are always a problem, and the reminders API doesn't support a lot of things people would want. Most of the GitHub issues are about this and I just don't have the time or inclination to try and fix them. This workflow is being retired and I'll be closing the issues with a link to this post.

### Hot Key List

I never use this one and it has a lot of problems so it's being retired.

### Twitter Archive Search

Andy filed an issue on [this last year](https://github.com/rknightuk/alfred-workflows/issues/30) and I figured the format of Twitter's export had changed. Turns out I'm a bit of an idiot. Changes:

- Fixed issue where the JSON couldn't be parsed
- Updated the path variable to use Alfred's file picker
- Added optional `tweet_url` variable to open tweets on another service, like [Tweetback](https://github.com/tweetback/tweetback)

### Gif Search

[Gif search](https://github.com/rknightuk/alfred-workflows/tree/main/workflows/gifsearch) is up there in my most-used workflows so when I saw the new [Alfred 5.5 grid view](https://www.alfredapp.com/help/workflows/user-interface/grid/) I knew I had to update it to support this. Doing so was fairly easy with one caveat - the workflow now requires pressing enter instead of a space after typing the keyword to search. Not a massive issue, but notable. This version requires the 5.5 beta of Alfred to use.

![Gif search with grid view](https://cdn.rknight.me/site/gif-search-grid-view.jpg)

You can view all [my Alfred workflows here](/alfred-workflows).