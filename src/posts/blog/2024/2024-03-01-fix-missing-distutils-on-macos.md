---
title: "Fix Missing Distutils on MacOS"
permalink: /blog/fix-missing-distutils-on-macos/index.html
date: 2024-03-01T23:00:14.663Z
excerpt: "A fix to a very annoying issue I encounted"
layout: post
tags:
    - Development
---

Sometimes I hate computers. This evening I lost two hours to a stupid issue that had me doing all sorts of command line nonsense trying to fix it.

I tried to install `xml2json` with npm and was presented with a wall of errors culminating in the actual error of `No module named 'distutils'`. It's related to `node-gyp` and anyone who's been using MacOS and node long enough knows this is always a pain in the arse.

After a lot of googling and reinstalling Xcode command line tools, it turns out when I'd upgraded some brew packages earlier in the evening this had upgraded my python install from 3.11 to 3.12; the latter of which _removes_ the aforementioned `distutils`. So I uninstalled python and did `brew install python@3.11` and it was fixed.

Fucking computers.

> [!NOTE] Update 2024-03-02
> As [David pointed out on Mastodon](https://mastodon.social/@xavdid/112024862625453237) this is a possibly temporary solution that might cause issues in the future. The real solution (although I don't remember if I tried this or not) is to do `pip install setuptools` as per [this GitHub issue](https://github.com/nodejs/node-gyp/issues/2869).