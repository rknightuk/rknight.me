---
title: "Fix for Slow Open and Save Dialog on MacOS"
permalink: /blog/fix-for-slow-open-and-save-dialog-macos/index.html
date: 2025-12-10T08:59:41.615Z
excerpt: "My open/save dialog became really laggy the past week so I went looking for a fix"
tags:
    - MacOS
---

Since I updated to MacOS Tahoe 26.1 the open/save dialog of Finder became unbearably slow, like five seconds for every navigation step. I found [this thread on Reddit](https://www.reddit.com/r/MacOS/comments/1op1vn0/slowness_when_opening_finder_windows_from_browsers/) that suggested turning off iCloud Drive documents and desktop syncing but I've never had that turned on. It also suggested turning off iCloud drive all together but I was not about to do that.

Someone in that thread linked to [this solution](https://www.reddit.com/r/MacOS/comments/1oqb1lf/comment/nocqk2h/) which is an easy one: delete the plist file that keeps track of recent folder locations. 

> I deleted `com.apple.appkit.xpc.openAndSavePanelService.plist` and restarted, now the Open/Save panel opens quickly.

To delete this file navigate to `~/Library/Preferences/` in Finder (<kbd>⌘</kbd> <kbd>⇧</kbd> + <kbd>G</kbd> or `Go` > `Go to Folder`) then delete `com.apple.appkit.xpc.openAndSavePanelService.plist`. I didn't even need to restart like the person on Reddit did and this immediately fixed it.

Why am I making a blog post with the same information as the Reddit thread? The reasons are twofold:

1. I'll probably need to reference this in the future.
2. I can't rely on a random Reddit thread (or two in this case) still existing in a months time, let alone a year or more.