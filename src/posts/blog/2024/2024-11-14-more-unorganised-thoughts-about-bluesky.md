---
title: "More Unorganised Thoughts about Bluesky"
permalink: /blog/more-unorganised-thoughts-about-bluesky/index.html
date: 2024-11-14T21:50:32.386Z
excerpt: "Follow up on my previous thoughts about Bluesky"
tags:
    - ActivityPub
    - OpenWeb
    - SocialMedia
---


I got a lot of feedback from [my last post](https://rknight.me/blog/unorganised-thoughts-about-bluesky/) which fell into two categories: either about the technical implementations or why someone is using Bluesky over other options. As soon as my sent my previous post Bluesky started having outages which has made looking into the feedback interesting to say the least but they've been adding obscene amounts of users every second today.

### Technical 

[MCG](https://social.lol/@mcg) and [Matt](https://social.lol/@matt) linked me to [this post](https://alice.bsky.sh/post/3laega7icmi2q) which is titled "_How to self-host all of Bluesky except the AppView (for now)_". There are more components to self-hosting Bluesky than say, Mastodon, but it is doable. Sort of. You can't do the `AppView` which "aggregates data from across the Atmosphere to produce their UIs". It's late and I don't have the energy to translate what that actually means but it sounds important.

The part that jumped out to me (after MCG mentioned it) is the article mentions needing 4.5tb of storage for the relay which is a fuckton and might as well be a million terabytes for the sake of discussing self-hosting. There is a second relay option called Jetstream which from my reading of it, can be used instead of the 4.5tb version. [Looking at the docs](https://docs.bsky.app/blog/jetstream) it's not ideal for all circumstances but if we assume it could work for a small user base then cool. This is, however, a far stretch from my question of could it be done on a single PHP file. Seems like that's going to be a no. ActivityPub is by no means simple but AT Proto seems infinitely more complicated.

### Why use it?

The _why_ is harder. There's no accounting for what people like or enjoy, people just _do_. A lot of it came down to just a feeling of what Bluesky is like (early Twitter was banded around a bit). 

Friend of the show [Alex Cox](https://alexcox.omg.lol) [pointed out](https://bsky.app/profile/alexcoxfm.bsky.social/post/3lawgdp47rc2y) to me, a cis white dude, that marginalised people on Mastodon are subject to constant reply guys and harassment. I'm embarrassed that I didn't even think of it.

> Most marginalized people who joined [mastodon.social](https://mastodon.social/) or another generic instance bounced pretty quickly because not many want to stick around and learn how to create your own instance when in the meantime you’re constantly blocking random guys telling you you’re doing it/everything wrong

As an aside, most of the reports we deal with on social.lol are spam probably because the instance is paid so there's a barrier that doesn't exist on mastodon.social and the other big instances.

### Final Thoughts

Ben has a [great post here](https://werd.io/2024/bluesky-the-fediverse-and-the-future-of-social-media) about Bluesky, the Fediverse, and the future of social media:

> Bluesky may evolve into a streamlined alternative to Twitter, while the Fediverse could serve as a decentralized, cross-platform connector among diverse networks

There's no reason to believe both can't continue to exist side by side. Mastodon isn't going anywhere and if better tools for self hosting come around for Bluesky, I could see myself potentially using both.

This is too much for one person to think about protocols[^1] but I do want to investigate hosting a PDS if only because my data could be deleted easily by me without relying on Bluesky to do so if something were to happen. I think this is the case although I suppose it'd be in other relays? Something to look into.

[^1]: Especially after [last week's](https://rknight.me/blog/thinking-about-recipe-formats-more-than-anyone-should/) [recipe](https://rknight.me/blog/why-is-no-one-using-the-recipe-schema/) [saga](https://rknight.me/blog/adding-cooklang-support-to-eleventy-two-ways/)