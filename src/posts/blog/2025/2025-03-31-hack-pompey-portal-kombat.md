---
title: "Hack Pompey: Portal Kombat"
permalink: /blog/hack-pompey-portal-kombat/index.html
date: 2025-03-31T11:21:32.000Z
excerpt: "My project for the Sea Change Hack Pompey hackathon"
tags:
    - Development
    - Hackathon
project: https://portkom.rknight.me
---

On Saturday I attended [Hack Pompey](https://hackpompey.co.uk) which was in collaboration with [Sea Change](https://portsmouth-port.co.uk/about-us/sustainability/sea-change/) this year:

> The Sea Change project will design, build and operate a ‘shore power’ system across the three busiest berths at Portsmouth International Port.

Sea Change provided some data about port movements, carbon levels, and related things for attendees to use for their projects. They released it a few days beforehand and I was able to have a poke around and work out an idea. [Portal Kombat](https://portkom.rknight.me), which is legally distinct from Top Trumps.

![Me presenting in front of a large screen showing Portal Kombat](https://cdn.rknight.me/site/2025/hack-pompey-2025-presentation.jpg)

Each card has data about the ship like size, length, weight, as well as number of visits and time spent in the port. It works just like Top Trumps: pick the stat you think will beat the other card and if you win, you get a point. In the case of Portal Kombat, you can see the name of the ship and the country of origin before guessing.

![The Portal Kombat website showing two ships on different cards as well as a scoreboard](https://cdn.rknight.me/site/2025/portal-kombat.jpg)

I was able to get images for all the ships from [Vessel Finder](https://www.vesselfinder.com/vessels/details/9201750) thanks to their excellent URL design: `/vessels/details/ID` where `ID` is the reference number of the vessel.

While coming up with the name for the project I also came up with the phrase "Yacht or Not"[^1] and I wanted to make use of it. So after every three points earned, you can play a round of Yacht or Not: based only on the name, guess if it's a yacht or not. The list came from [Vessel Finder's port lookup](https://www.vesselfinder.com/ports/GBGOS001) where I looked at Gosport marina and grabbed the vessel names.

![Yacht or Not asking if Vulcan Spirit is a yacht or not](https://cdn.rknight.me/site/2025/yacht-or-not.jpg)

One update I have made since saturday is that "time in port" requires you to get a _lower_ score to win, not a higher one because the boats are usually on diesel to keep everything running even when docked - something Sea Change are trying to fix.

As with most hackathon projects, there's more I could do but I probably won't but if I change my mind:

- Highlight which stat someone picked
- Sound effects
- Store previous games in local storage
- Focus on carbon emissions when that is selected

The day ran smoothly as usual and I'm looking forward to the next one.

[^1]: For the youths, "hot or not" was a website once
