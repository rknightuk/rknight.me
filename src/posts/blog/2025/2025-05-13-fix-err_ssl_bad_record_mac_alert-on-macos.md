---
title: "Fix ERR_SSL_BAD_RECORD_MAC_ALERT on MacOS"
permalink: /blog/fix-err_ssl_bad_record_mac_alert-on-macos/index.html
date: 2025-05-13T21:00:24.797Z
excerpt: "I was just about ready to throw my computer into the sea until a random Reddit user had a solution"
tags:
    - MacOS
---

I got a new MacBook a couple of weeks ago but since I've had it I've not been able to use Tesco's website to do my shopping but I'd just ignored it and used my work machine. Then tonight I couldn't upload [the latest episode of Ruminate](https://ruminatepodcast.com/209/) to Libsyn so I had to investigate.

`ERR_SSL_BAD_RECORD_MAC_ALERT` was the error I was seeing in the console on both sites. There was lot of suggestions of resetting the Mac, re-adding the wifi, I rebooted my network, but none of it worked. Then the last comment of [this Reddit thread](https://www.reddit.com/r/MacOS/comments/1cmz6jl/err_ssl_bad_record_mac_alert/) said "_I discovered that I had to set the MTU of the Macbook (not the router!) to 1280 and I no longer have the issue_". No explanation as to how bacon1097 discovered this but I tried it anyway and it worked. To do this go to Settings > Network > Wi-Fi > Details > Hardware.

I don't care to look up what an MTU is[^1] or why making it 1280 fixed it but it did and that's all that matters.

[^1]: In a previous life I was traning to be a network engineer and I wouldn't have given a shit what an MTU is then either.