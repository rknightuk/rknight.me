---
title: MacOS
permalink: intersect/macos/index.html
eleventyNavigation:
  key: MacOS
  parent: Intersect
---

I use MacOS as my primary OS on a 2019 16" MacBook Pro.

There are a number of tweaks and settings I toggle on a fresh install which you can view [in my dot files](https://github.com/rknightuk/dotfiles/blob/master/osx/set-defaults.sh). These dotfiles also include scripts to install all of the apps and command line tools I use.

### Keyboard Shortcuts

#### Finder

- <kbd>command ⌘</kbd> <kbd>shift ⇧</kbd> <kbd>.</kbd> - Toggle hidden files in Finder
- <kbd>command ⌘</kbd> <kbd>shift ⇧</kbd> <kbd>g</kbd> - Go to folder in Finder
- <kbd>command ⌘</kbd> <kbd>shift ⇧</kbd> <kbd>n</kbd> - Create new folder in Finder

#### Screenshots

- <kbd>command ⌘</kbd> <kbd>shift ⇧</kbd> <kbd>4</kbd> - Take screenshot of selection
- <kbd>command ⌘</kbd> <kbd>shift ⇧</kbd> <kbd>5</kbd> - Bring up the screenshot menu(?) to do screen recording, screenshots, and other stuff
- <kbd>command ⌘</kbd> <kbd>shift ⇧</kbd> <kbd>control ⌃</kbd> <kbd>4</kbd> - Selection screenshot direct to clipboard

#### Misc

- <kbd>option ⌥</kbd> <kbd>3</kbd> to type an octothorpe/hashtag `#`
- <kbd>option ⌥</kbd> <kbd>shift ⇧</kbd> <kbd>-</kbd> for an em dash `—`
- <kbd>/</kbd> or <kbd>~</kbd> to go to folder in a save dialog

### Dock

I have my dock hidden with no apps in it by default. I launch everything with [Alfred](/macos/alfred)

### Adding Custom Alert Sounds

Put the audio files in `~/Library/Sounds` and they show up in Preferences > Sound > Sound Effects.

### List All URL Schemes

```bash
/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -dump URLSchemeBinding
```

[URL Scheme Alfred workflow](https://github.com/rknightuk/alfred-workflows/tree/main/workflows/url-schemes)

### Add App to Finder Toolbar

<kbd>command ⌘</kbd> and drag the app to to Finder toolbar to pin it there.

### Developer Folder

[~./Developer has a special icon on MacOS](https://twitter.com/a_grebenyuk/status/1458249706220527616)

### Zoom in Preview

[Press <code>`</code> to toggle it](https://twitter.com/codepo8/status/1511650091425222657)

### Remove background in Preview

1. Select 'Markup'
2. Select 'Auto Alpha' 
3. Click and drag down to select the desired background
4. Press delete on the keyboard 
5. Repeat steps 3 & 4 if necessary

Source: [10 Tips - Preview the Mac app people forget about](https://www.fourth-wall.co.uk/post/10-tips-for-preview-the-default-mac-app-that-people-forget-about#viewer-cdv6n)

### Built in speed test

```bash
networkQuality -v
```

### Keyboard Navigation in Modals

[System Settings > Keyboard > Keyboard Navigation](https://twitter.com/wesbos/status/1602324079482118145)

### Reminders URL Scheme

`x-apple-reminderkit://REMCDReminder/{UUID}`