---
title: "Fix Double Volume Jump on 8BitDo Keyboard with Karabiner Elements"
permalink: /blog/fix-double-volume-jump-on-8bitdo-keyboard-with-karabiner-elements/index.html
date: 2024-05-25T13:10:57.264Z
excerpt: "A slightly hacky fix for the volume knob moving the volume twice"
tags:
    - MacOS
    - WeblogPoMo
---

After writing this post and using the new setup for a few days I would occasionally get a delay when changing the volume so I've turned this off but I want to keep the post anyway for reference in the future.

---

I've been enjoying [my new keyboard from 8BitDo](https://rknight.me/blog/using-the-8bitdo-keyboard-on-macos/) but one thing has been bothering me. Unlike the MacOS keyboard buttons, the volumne knob[^1] on the 8BitDo increments or decrements the volume _twice_ on each turn.

Since I wrote that post I switched all my key-mapping needs to [Karabiner Elements](https://karabiner-elements.pqrs.org/) which is the most developery tool in the land but it's really powerful. I was able to use it to handle my [hyper key](https://sebastiandedeyne.com/hyper-key/), remapping the <kbd>⌘</kbd> and <kbd>⌃</kbd> buttons, as well as a convoluted system for using a different hotkey with iTerm on different keyboards. But I digress.

KE has a feature called complex modifications which allow you to define key overrides with JSON, literally the worst format for user-editable configuration. The system volume can be controlled with AppleScript so I knew I wanted to run the following script every time the knob was turned. Technically this is running `osascript` to _then_ run AppleScript from the shell but who cares, you get the point.

```bash
osascript -e "set volume output volume (output volume of (get volume settings) + 6.25)
```

This takes the current volume level and adds 6.25% to it. Why that number? Because there are 16 segments on the usual volume overlay and the standard is to increment just one of those segmenets so 100 / 16 = 6.25.

> [!NOTE] Update 2024-06-25
> Josh emailed to suggest changing the step from 6.25 to 2. This seems to have fixed the issues I was having so the script below has been updated.

I then used the event viewer in Karabiner to identify the key code of the volume knob changes: `volume_increment` and `volume_decrement`.

Finally, I wanted to limit this change to only volume changes coming from the 8BitDo keyboard. The event viewer also shows the vendor ID of the keyboard so I was able to use [device logic in KE](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/device/) to limit it. The final configuration looks like this:

```json
{
  "description": "Fix 8BitDo Volume",
  "manipulators": [
    {
      "conditions": [
        {
          "identifiers": [
            {
              "vendor_id": 11720
            }
          ],
          "type": "device_if"
        }
      ],
      "from": {
        "key_code": "volume_increment"
      },
      "to": [
        {
          "modifiers": [],
          "shell_command": "osascript -e \"set volume output volume (output volume of (get volume settings) + 2)\""
        }
      ],
      "type": "basic"
    },
    {
      "conditions": [
        {
          "identifiers": [
            {
              "vendor_id": 11720
            }
          ],
          "type": "device_if"
        }
      ],
      "from": {
        "key_code": "volume_decrement"
      },
      "to": [
        {
          "modifiers": [],
          "shell_command": "osascript -e \"set volume output volume (output volume of (get volume settings) - 2)\""
        }
      ],
      "type": "basic"
    }
  ]
}
```

[^1]: Who doesn't love a good knob?