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