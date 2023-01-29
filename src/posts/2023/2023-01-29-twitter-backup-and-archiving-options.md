---
title: Twitter Backup and Archiving Options
permalink: /twitter-backup-and-archiving-options/index.html
date: 2023-01-29
excerpt: "Three different options for managing your Twitter archive"
layout: post
---

If you want to make your Twitter archive a bit more useful than the standard backup Twitter give you, there are 3 options of varying complexity I'm aware of.

### Option 0: Don't do anything

This is by far the easiest option. Don't care about your tweets. Let them wither away into the ether. Be free from the shackles of hoarding your data.

### Option 1: Tiny Subversions

[Darius Kazemi of Tiny Subversions](https://tinysubversions.com/twitter-archive/make-your-own/) made this tool to make a self hosted, searchable archive. It's as simple as uploading the `.zip` file of your archive, give it a minute, and the new archive will be downloaded.

![Tiny Subversions twitter archive](https://rknightuk.s3.amazonaws.com/site/twitter-tiny-subversions.png)

### Option 2: TwitVault

[TwitVault/](https://terhechte.github.io/twitvault/) is a desktop App for Mac, Windows, and Linux that has the biggest feature set. Download it, login with your Twitter credentials, and let it do it's thing. This initial setup will pull everything is can from the Twitter API but that has limits: 3200 tweets and 800 mentions. Once that part of the setup is done (this can take a while), you can then pull in your full archive in the terminal.

![TwitVault screenshot](https://rknightuk.s3.amazonaws.com/site/twitter-twitvault.png)

### Option 3: Tweetback

[Tweetback](https://github.com/tweetback/tweetback) is a tool built with [Eleventy](https://www.11ty.dev/) and is my current choice for making my archive available. You can see mine at [hellsite.rknight.me](https://hellsite.rknight.me/). The steps to get this working are more involved than the previous options but I'm a big fan of the output. I won't go through the steps here but the [readme](https://github.com/tweetback/tweetback/blob/main/README.md) has detailed instructions.

![Tweetback screenshot](https://rknightuk.s3.amazonaws.com/site/twitter-tweetback.png)

One other related part of Tweetback is [tweetback-canonical](https://github.com/tweetback/tweetback-canonical). If you add your archive and username to the repository, anyone who uses Tweetback and has tweets that mention you, those tweets will link back to your archive rather than Twitter's website itself. For example, [this tweet](https://hellsite.rknight.me/1489618994000805889/) where I mention Zach links to [his archive](https://www.zachleat.com/twitter/1489616692678434816).
