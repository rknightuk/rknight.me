---
title: "Trying Raycast: Part Two"
permalink: /blog/trying-raycast-part-two/index.html
date: 2024-05-23T07:26:43.253Z
excerpt: "In this second part I dig into extensions including building some of my own"
layout: post
tags:
    - Alfred
    - MacOS
    - Raycast
    - WeblogPoMo
project: /projects/raycast-extensions
---

![Raycast fainted](https://cdn.rknight.me/site/raycast-battle-2.jpg)

In [part one](https://rknight.me/blog/trying-raycast-part-one/) I covered how many of Alfred's built-in features Raycast has (it's basically all of them). Firstly, some follow up.

I mentioned my toggle workflow from Alfred in the last post. [Lewis pointed out](https://social.lol/@lewis/112364826196010602) that most of the toggles exist in Raycast. I needed to install [the Wi-Fi extension](https://www.raycast.com/koinzhang/wi-fi) to have wifi toggling but all of that is now working as I want.

Lou sent me [his post about his 10 favourite use cases for Raycast](https://amerpie.lol/2024/04/25/my-favorite-raycast.html) which has some great extensions including the [Image Modification](https://www.raycast.com/HelloImSteven/sips) which works really well.

I also noticed the built in calculation isn't limited to basic maths like Alfred is: I can do things like `25% of 1500` or `25c in f` and get a result.

One other thing I'm still getting used to compared to Alfred: search. In Alfred, if I search for `54.01` with the `find` command it will find files _and_ folders with `54.01` in the title. In Raycast, folders seem to have a lower ranking and don't show up without an exact name match so I installed the [folder search](https://www.raycast.com/GastroGeek/folder-search) extension to help with this.

For part two I wanted to look at the workflows I use and how many of those I can replace.

### Easy Replacement Workflows/Extensions

This is the list of workflows in Alfred I was able to replace with extensions from the Raycast store.

- [Amphetamine](https://www.raycast.com/gstvds/amphetamine)
- [Apple Notes](https://www.raycast.com/raycast/apple-notes)
- [Date Converter](https://www.raycast.com/asportnoy/date-converter)
- [GitHub](https://www.raycast.com/raycast/github)
- [HTTP Status Codes](https://www.raycast.com/Alex_/http-status-codes)
- [IP Geolocation](https://www.raycast.com/koinzhang/ip-geolocation)
- [Lorem Ipsum](https://www.raycast.com/AntonNiklasson/lorem-ipsum)
- [omg.lol](https://www.raycast.com/danpalmer/omg-lol) - for creating new pastes
- [Set audio device](https://www.raycast.com/benvp/audio-device)
- [TablePlus](https://www.raycast.com/pernielsentikaer/tableplus)
- Temperature conversion is built in. Nice.

The fact that so many of these were readily available, and work as they say, which says a lot about the developer community for Raycast. With Alfred, you almost always end up finding at least one broken or abandoned workflow before finding a good one.

The [Obsidian](https://www.raycast.com/KevinBatdorf/obsidian) extension is close enough to QuickNote that I'll just live with it for now.

### Script Commands

Raycast has a concept of [script commands](https://github.com/raycast/script-commands) which I used to replace the following workflows. I've put [all my script commands on GitHub](https://github.com/rknightuk/raycast-script-commands).

#### Common Folders

This one was very easy because all it did was allow me to open some common folders I always need to get to. New script command, set the command to run `open ~/Downloads`. Repeat for screenshots and my work folder.

#### App Mode

This is my workflow to open some apps, documents, and websites depending on what I'm doing - at home, working, or podcasting. This was easy enough to do by creating a new script command, setting options for the mode (home, work, podcasting), and editing the bash script to open apps and documents I need.

```bash

#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title App Mode
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 🤖
# @raycast.argument1 { "type": "dropdown", "placeholder": "Choose Mode", "data": [ { "title": "Home", "value": "home" }, { "title": "Work", "value": "work" }, { "title": "Podcasting", "value": "podcasting" } ] }

# Documentation:
# @raycast.description Open Apps
# @raycast.author Robb Knight
# @raycast.authorURL https://rknight.me

# Quit all apps
open raycast://extensions/raycast/system/quit-all-applications

CORE=(Discord Safari Mail Music Slack Raindrop Ivory iTerm Obsidian)

TYPE=$1

open_core_apps () {
    for value in "${CORE[@]}"
    do
        open -a "$value"
    done
}

if [ "$TYPE" = 'home' ]; then
    open_core_apps
	exit
fi

if [ "$TYPE" = 'work' ]; then
    open_core_apps
    open -a PhpStorm
    open -a Gitify
    open -a "Google Chrome" https://github.com/notifications?query=is%3Aunread
    osascript -e "set volume with output muted"
	exit
fi

if [ "$TYPE" = 'podcasting' ]; then
    open -a Ivory
    open -a Zoom
    open -a "Audio Hijack Pro"
    open -a Notes x-coredata://89A52B7C-2866-471A-A244-2F0F807EA32B/ICNote/p137
    open -a "Sublime Text" /Users/robb/Library/Mobile\ Documents/com~apple~CloudDocs/knightdrive/20-29\ Podcasts/20\ Ruminate/20.04\ Shownotes/shownotes.md
	/opt/homebrew/bin/SwitchAudioSource -s "DELL U2419H"
	/opt/homebrew/bin/SwitchAudioSource -s "Razer Seiren Mini" -t "input"
	exit
fi
```

#### New file in finder

This one is an almost direct copy of my Alfred version - although I fixed it so it _actually_ works when there's no Finder window open.

```bash
# count the open finder windows
COUNT="$(osascript -e 'tell application "Finder"' -e 'count of (every window where visible is true)' -e 'end tell')"

if [ "$COUNT" -eq "0" ]; then
	# If no windows open, default to downloads
	DIR="~/Downloads"
else
	# get the frontmost finder window
	DIR=$(osascript -e 'tell application "Finder"' -e 'set pathList to (POSIX path of (folder of the front window as alias))' -e 'end tell')
fi

NEW_FILE=$1
FILE_WITH_PATH="$DIR$NEW_FILE"

if test -f "$FILE_WITH_PATH"; then
    echo "$NEW_FILE aleady exists"
else
	touch "$FILE_WITH_PATH"
	echo "$NEW_FILE created in $DIR"
fi
```

### Custom Extensions

#### Copy Safari Tabs

I couldn't find anything that would do this for me, so into [the Raycast docs](https://developers.raycast.com) I went. The Alfred version of this used Javascript for Automation but that isn't an option for Raycast, but it _does_ have a [`runAppleScript` function](https://developers.raycast.com/utilities/functions/runapplescript). I opened up Script Editor, wrote an AppleScript to get all Safari tabs and output them into a format I could handle in the Javascript.

From there, I was able to show a list of format options, then handle copying the correct format to the clipboard with the `Action` component from the Raycast library.

As of writing, [I have a pull request open](https://github.com/raycast/extensions/pull/12131) for this to get it onto the store but there's some discussion about merging it into the existing [Safari extension](https://www.raycast.com/loris/safari). I'll update the post when this changes.

[Source code on GitHub](https://github.com/rknightuk/raycast-safari-tab-copier)

![Raycast Safari Tab Copier extension](https://cdn.rknight.me/site/raycast-ex-safari-tabs.jpg)

#### Text Transform
 
Since I'd done the Safari tab copier, this was much quicker to achieve. Take an input, transform it to the various formats I want, then show those as options to copy. Done. 

[Source code on GitHub](https://github.com/rknightuk/raycast-text-transformer).

Only after this did I realise I hadn't actually checked the store for an extension. The [Change Case](https://www.raycast.com/erics118/change-case) extension does exactly what I need. One thing it doesn't do is allow me to type in - it always takes the clipboard contents but I can live with that.

### Gif Library Search

Raycast extensions can run AppleScript so I was able to pretty much copy-paste my Alfred workflow into a new extension and had this working pretty quickly.

This was rejected because a [similar extension already exists](https://www.raycast.com/ibll/image-wallet) but I prefer mine so if you want to use it you can.

[Source code on GitHub](https://github.com/rknightuk/raycast-gif-library-search).

![Raycast Gif Library Search](https://cdn.rknight.me/site/raycast-ex-gif-library-search.jpg)

Lastly, my Brian Butterfield soundboard, which is ~~highly important~~ not important at all to my workflow. I decided I don't really need that.

#### The Raycast Extension Store

The Raycast store is great. Having something built-in to quickly install is really handy. 

However, for my Gif workflow there is an extension that does something similar which I didn't find because it's called "Image Wallet" which isn't a great name. The initial response from Raycast is that if another extension will do what I want, then they don't want my extension. I appreciate Raycast want to keep the store tidy but not allowing any extensions that are even remotely similar is slightly annoying. Still better than Alfred's offering though.

I was able, however, to submit an update to the existing [omg.lol extension](https://www.raycast.com/danpalmer/omg-lol) to add support for updating status.lol.

![Status.lol Raycast extension](https://cdn.rknight.me/site/raycast-ex-status-lol.jpg)
### Conclusion

I'm not going to be using Alfred any more. Raycast is better in pretty much every way. So much of what I built for Alfred is already built into Raycast, the extension store is excellent even with the above caveats, and everything looks so much better. Sorry Alfred, it's been a good nine years 🫡