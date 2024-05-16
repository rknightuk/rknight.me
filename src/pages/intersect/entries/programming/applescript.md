---
title: AppleScript
permalink: intersect/programming/applescript/index.html
eleventyNavigation:
  key: AppleScript
  parent: Programming
---

## Notes

Find out if an app has AppleScript capabilities open Script Editor then File > Open Dictionary.

Getting the share link for an Apple Music track isn't possible.

## Run Applescript from Terminal

```bash
osascript -e 'tell application "Music" to artist of current track'
```

## Get Properties of Item

```bash
tell application "Music" to get properties of current track
```

## Simulate Keypress

```applescript
# single keypress
tell application "System Events"
	key code 17
end tell

# keypress with modifier
tell application "System Events"
	key code 17 using { shift, control, option, command }
end tell
```

## Get Current Finder Path

```applescript
tell application "Finder"
	set pathList to (quoted form of POSIX path of (folder of the front window as alias))
end tell
```

## Toggle Dark Mode

```applescript
tell application "System Events"
	tell appearance preferences to set dark mode to not dark mode
end tell
```

## Toggle Wifi

```applescript
set network to (do shell script "networksetup -listallhardwareports | grep -A 1 Wi-Fi | tail -n 1 | cut -b 9-12")
if (offset of "On" in (do shell script "networksetup -getairportpower " & network & " ")) > 0 then
	do shell script "networksetup -setairportpower " & network & " off"
else
	do shell script "networksetup -setairportpower " & network & " on"
end if
```

## Set Volume

Switch `output` for `input` to do input devices like microphones

```applescript
# number is a percentage, 0 to mute
set volume input volume 50
```

## Set Desktop Wallpaper

```applescript
tell application \"Finder\" to set desktop picture to POSIX file "path/to/file.jpg"
```