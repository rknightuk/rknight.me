---
title: "Forgejo Support for EchoFeed"
permalink: /blog/forgejo-support-for-echofeed/index.html
date: 2026-02-04T12:38:55.512Z
excerpt: "Today I've added support for Forgejo to EchoFeed"
tags:
    - EchoFeed
---

I've just merged in support for [Forgejo](https://forgejo.org) to EchoFeed. Forgejo is a "_self-hosted lightweight software forge_" aka "We have GitHub at home"[^1]. [Adam](https://neatnik.net) is [running an instance](https://source.tube) as part of [omg.lol](https://omg.lol).

It works the same at the GitHub integration with one exception: no OAuth. Forgejo can exist on any domain, like Mastodon, but it doesn't allow for creating applications (like EchoFeed) on-the-fly. Instead, it uses access tokens which isn't as convenient but I didn't want to create applications on every instance someone might want to use. Here's a screenshot of the required permissions but [check the docs](https://help.echofeed.app/services/#foregjo) for the details on setting the right permissions.

![Forgejo settings required for EchoFeed](https://cdn.rknight.me/echofeed/forgejo-access-token-settings.jpg)

Forgejo support is available to everyone right now.

[^1]: I don't intend this to be mean but the uncanny valley of how close the UI is to GitHub is hard to miss