---
title: Prami's Challenge
permalink: /blog/pramis-challenge/index.html
date: 2022-12-18T07:43:47.235Z
excerpt: "I attempted Prami's challenge and didn't even get close"
tags:
    - Development
    - SocialMedia
---

[Prami posted a challenge on social.lol](https://social.lol/@prami/109530090151262300) to decode this string and win a lifetime subscription to [omg.lol](https://home.omg.lol/referred-by/robb). 

> The string below is an encoded lifetime omg.lol gift code:
> 
> eoad1o1fpoawctnjeiri11dmj7rir6d8ehadkt4seo6u4
>
> [...]
> 
> in this format: XXXX-XXXX-XXXX-XXXX

I figured I'd have a go which ended up being a good few hours. Then I [kind of lost my mind a bit](https://toot.rknight.me/2022/12/17/this-challenge-from.html). Then went to bed having given up (and needing to be up for a flight this morning). 

Overnight, [Joanna](https://social.lol/@jmj) solved it and I felt like I'd been presented with a sock, I was free. [The solution](https://social.lol/@prami/109531877004198974) was 3 schemes: `z-base-32` then `rot13` then `base64`. I googled _a lot_ last night and not once did I see [`z-base-32`](https://en.wikipedia.org/wiki/Base32#z-base-32) so I had no chance (although I _was_ [on a website that supports it](https://cryptii.com/pipes/z-base-32) but clearly didn't see it).

Other things I tried:

- Various different cypher detectors
- Asking [ChatGPT](https://chat.openai.com/chat) nicely
- [hashcat](https://hashcat.net/hashcat/)
- [Ciphey](https://github.com/Ciphey/Ciphey) - this one crashed my computer trying to run overnight
