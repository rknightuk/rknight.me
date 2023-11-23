---
title: Follow Mastodon User on Micro.blog Shortcut
permalink: /follow-mastodon-user-on-micro.blog-shortcut/index.html
date: 2022-11-03
excerpt: "A shortcut to redirect to the correct follow page to follow a Mastodon user on Micro.blog"
layout: post
tags:
    - Mastodon
    - SocialMedia
    - Shortcuts
---

[Micro.blog](https://micro.blog) has support for following and replying to Mastodon users but getting from someone's profile on Mastodon to the follow page on Micro.blog can be a pain. To search for a user you need have it in the format of `cooluser@mastodon.instance` which isn't the same as the profile URLs. To make this easier I made a shortcut that does the following:

1. Takes the current Safari URL, for example `https://mastodon.instance/@cooluser`
2. Gets the domain (`mastodon.instance`) and the path (`@cooluser`)
3. Swaps those round to become `cooluser@mastodon.instance`
4. Opens the page on Micro.blog to be able to follow that user (`https://micro.blog/cooluser@mastodon.instance`)

It will also check to see if the path/username contains an `@` symbol and if it doesn't will show an alert instead. This isn't ideal but given that Mastodon can have any domain, it's much harder to detect if it's a Mastodon site or not. 

There is a meta tag in the HTML with `profile:username` as the property name but I don't know enough about Shortcuts to do this.

[Download Follow Mastodon User on Micro.blog shortcut v1.1](https://www.icloud.com/shortcuts/fe47f7e4ed104f7dbb8202b49c3482c4)

### Previous Versions

- [v1.0](https://www.icloud.com/shortcuts/c055237a4b744d9eb5b120fe017b8356) - this version won't work if the user hasn't been seen before by Micro.blog