---
title: "Finding Asterisk Tracker"
permalink: /blog/finding-asterisk-tracker/index.html
date: 2024-05-06T07:20:00.210Z
excerpt: "The story of how I found 30-year-old game with a crude Keynote drawing and Google reverse image search"
tags:
    - Games
    - WeblogPoMo
---

I started writing a post about my computing history (coming soon) and realised I couldn't remember the name of a game I played a lot of in the early 90s. The best way to describe it is flappy bird in space.

I [tooted with this description](https://social.lol/@robb/112355126747199555):

> black background with white stars and you had to get from the left to the right by pressing spacebar to go up and down and avoid the stars? Each level added more stars. You were a spaceship I think and it would draw your path as you went.

I also shared this in my work Slack and got some suggestions that were too advanced or clearly too modern to be the game I was thinking of so I drew this in Keynote of exactly how I remembered the game so I could show people what I meant:

![My drawing of the game](https://cdn.rknight.me/site/asterisk-tracker.jpg)

We did some more searching around to no avail. Then [Charlie](https://www.tldrqwerty.me) jokingly suggested I should reverse image search it so I did and to my surprise it actually worked. This led me to two versions of the game: Asterisk Tracker and Star Dodger.

### Asterisk Tracker

For Asterisk Tracker I was led to [this Retro Computing stack exchange question](https://retrocomputing.stackexchange.com/questions/6831/origin-source-of-one-line-one-key-game) where someone had done an almost identical drawing to me attempting to find the game. This was it, the exact game I was looking for.

The top answer says was "_published in the December 1984 issue of Beebug magazine. The author was N. Silver_.". The code in it's entirety is here:

```bash
1L=0:REP.L=L+3:MO.4:DR.1279,0:DR.1279,452:MOVE1279,572:DR.1279,1023:DR.0,1023:F.I=1TOL:V.31,RND(32)+5,RND(31),42,30:N.:P.(L-3)/3:X=0:Y=512:REP.PL.69,X,Y:X=X+4:Y=Y-(INKEY-74+.5)*8:U.PO.X,Y)=1ORX=1280:U.X<1280:V.7:REP.U.INKEY-99:RUN
```

This page has it [running in an emulator](https://bbc.xania.org/?autorun&loadBasic=https://gist.githubusercontent.com/scruss/8ba31a3fc154042285d21cf7ffdfff69/raw/9007afc9d252f4866f93cfc8f474b1d8ea6a76ee/ASTER) (use return/enter to move up) which didn't quite look as I remembered so I carried on looking. Here's what it looks like running:

![My drawing of the game](https://cdn.rknight.me/site/asterisk-tracker-2.jpg)

### Star Dodger

The only other match on Google images was this blog post about [a game called Star Dodge](https://scruss.com/blog/2012/09/08/2d-star-dodge-flies-again/) which was a clone of...Asterisk Tracker. So it looking different in the emulator was a (human) memory issue. That post linked to [this post specifically about Asterisk Tracker](http://scruss.com/blog/2018/07/05/space-acid-poisoning/). They even found the page in the magazine where the program came from:

![Beebug magazine](https://cdn.rknight.me/site/beebug-magazine.jpg)

Playing the game now, I get the exact same feeling of stress as the levels gets more complicated. Not sure if I need that in my life but this was a fun detour.