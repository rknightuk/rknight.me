---
title: How to Copy Gifs to Clipboard Programatically
permalink: /blog/how-not-to-copy-gif-to-clipboard-programatically/index.html
date: 2022-12-01T00:00:00.000Z
excerpt: "My futile attempts at trying to copy a gif to the clipboard programatically"
layout: post
tags:
    - Development
    - MacOS
    - Alfred
---

**Update 1**

[Ed Wellbrook solved this with grabgif](https://github.com/edwellbrook/grabgif) like the absolute hero he is.

**Update 2**

Turns out in my frustrated state, some of the things I tried _did_ work but I just didn't notice (or I did something like clear the clipboard by accident). After looking at Ed's solution it clicked. This solution _does_ work:

```bash
osascript -e 'set the clipboard to POSIX file "/path/to/animated.gif"
```

I will leave the rest of the article but everything below is kind of useless now.

---

If you've come to this post to find out how to copy an animated gif to the clipboard programatically: I'm sorry. All I have is many solutions that either don't work at all, or only partially work.

Why was I doing this? I've had an idea for an [Alfred](https://www.alfredapp.com/) workflow for a while that would list all the gifs in my gif folder then copy it to the clipboard so I can paste in to Slack (or anywhere that supports copy/pasting animated gifs). I like to keep things as simple as possible with [my Alfred workflows](https://github.com/rknightuk/alfred-workflows) so I figured I'd try AppleScript/JXA first.

## AppleScript and JXA

There are loads of StackOverflow posts describing how to copy _images_, some of which even say it works with gifs. They do not. At best, some of them will copy the first frame of the gif to the clipboard, at worst they flat out don't work.

```bash
# these work but will only get the first frame

osascript -e 'set the clipboard to (read (POSIX file "/path/to/animated.gif") as {«class GIFf»})'

osascript -e 'set the clipboard to (read "/path/to/animated.gif" as GIF picture)'


# these do not work at all

osascript -e 'set the clipboard to (read (POSIX file "/path/to/animated.gif")'

osascript -e 'set the clipboard to POSIX file "/path/to/animated.gif"'
```


## Command Line Tools

I found a number of CLI tools that looked promising. The first of these I came across was [`impbcopy`](https://gist.github.com/mwender/49609a18be41b45b2ae4) but this only works with `png` files. Perhaps there's a way to modify this to work but I wasn't able to see how to do that. Likewise with [`pngpaste`](https://github.com/moicci/pngpaste) which claims to support gifs.


## Conclusion

Having spent a good few hours on this at this point I am assuming this can't be done. If someone knows of a way to do this I would be very interested to see a solution.