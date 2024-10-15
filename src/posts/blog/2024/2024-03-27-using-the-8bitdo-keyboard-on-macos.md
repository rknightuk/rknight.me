---
title: "Using the 8BitDo Keyboard on MacOS"
permalink: /blog/using-the-8bitdo-keyboard-on-macos/index.html
date: 2024-03-27T20:30:08.729Z
excerpt: "How I setup the 8BitDo Keyboard to work as I'd like on MacOS"
layout: post
tags:
    - MacOS
featured: true
---

This week I bought the [8BitDo Retro Mechanical Keyboard](https://www.8bitdo.com/retro-mechanical-keyboard/) which is not supported by MacOS, at least according to their website. I came across [this Reddit post](https://www.reddit.com/r/8bitdo/comments/17aszl4/8bitdo_mechanical_keyboard_on_mac/) that said it _does work_ so I decided to go for it. I think when they say it isn't supported they mean their [software for accessories](https://app.8bitdo.com/Ultimate-Software-V2/) doesn't work on MacOS but I knew I didn't need that.

tl;dr: Yes it works on MacOS. The volume knob works. You can remap the keys to be more Mac-like.

![The 8BitDo Keyboard](https://cdn.rknight.me/site/8bitdo-keyboard.jpg)

The keyboard has Kailh Box White Switches, hot-swappable PCB, and supports n-key rollover. Apparently, those are words that mean things to people.

The first thing I did was swap the keys so the layout was closer to a Mac layout. I also prefer how it looks with the <kbd>A</kbd> and <kbd>B</kbd> keys in this configuration.

Because this is designed as a Windows keyboard I needed to swap what the <kbd>Command ⌘</kbd> and <kbd>Option ⌥</kbd> do. To do this I opened System Settings > Keyboard > Keyboard Shortcuts > Modifier Keys then switched them around. You can also use something like [Karabiner-Elements](https://karabiner-elements.pqrs.org/) to remap keys.

![MacOS keyboard system settings](https://cdn.rknight.me/site/keyboard-system-settings.jpg)

However, the two buttons on the right (between <kbd>B</kbd> and <kbd>control</kbd>) are programmable so don’t trigger anything on press by default. To set these, you need to press the star button on the top of the keyboard, then hold down the key(s) you want it to use, then press the key you want to assign. The same method is used for assigning presses to [the super buttons](https://shop.8bitdo.com/products/8bitdo-dual-super-buttons).

The keyboard comes with one set of super buttons but it supports up to four sets. I have set one of them to trigger <kbd>⌃ ⇧ C</kbd> to bring up Alfred's clipboard search and the other is set to <kbd>F12</kbd> which triggers a Honk sound via my [Honk Alfred workflow](https://github.com/rknightuk/alfred-workflows/tree/main/workflows/honk). I am tempted to buy some more buttons but I'm going to see if I actually use them for much first.

It has a volume knob on the top left that works perfectly on MacOS. It also supports wired connection, bluetooth connection, as well as it's own dongle. I haven't tried the dongle but both wired and Bluetooth work very well.

I've not used a mechanical keyboard for a long time, certainly not a modern one, but I like typing on it. I doubt I'm going to become a mechanical keyboard person because the last thing I need is another expensive hobby but I can feel the call of custom keycaps already.

I considered getting the [matching mouse](https://shop.8bitdo.com/products/8bitdo-n30-2-4ghz-wireless-mouse-for-windows-and-mac-pc-dvd) but I doesn’t look very ergonomic and I suspect wouldn’t help my RSI issues.