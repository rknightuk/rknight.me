---
title: Notes About Setting up RetroPie
excerpt: "Some things I learnt (or want to remember) about setting up a RetroPie"
permalink: /notes-about-setting-up-retropie/index.html
date: 2017-07-04 10:14:15
tags:
layout: post
---

Setting up [RetroPie](https://retropie.org.uk/) on a Raspberry Pi is fairly easy but I did come up against a couple of issues that I needed to fix. This post is just a collection of quick fixes for those issues.

### Remove underscored games when transferring from a Mac

When copying ROMs from a Mac, you may end up with a bunch of files that start with an underscore. To remove them all, run the following: 

```
find /home/pi/RetroPie -name "._*" -exec rm -rf {} \;
```

[[source](https://retropie.org.uk/forum/topic/4348/removing-_-files-from-rom/10)]

### Finding Installed Themes

For the theme I'm using, I wanted to edit the SNES background image to use the non-US SNES (read: the one true SNES). Installed themes are stored in `/etc/emulationstation/themes`.

### Finding decent ROMs

The best site I've found for searching for specific ROMs is [Complete ROMS](http://www.completeroms.com/). They don't have *everything* but the site is clean and easy to find exactly what you're looking for.


