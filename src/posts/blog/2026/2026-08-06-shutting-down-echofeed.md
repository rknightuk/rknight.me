---
title: "Shutting Down EchoFeed"
permalink: /blog/shutting-down-echofeed/index.html
date: 2026-08-06T13:05:15.000Z
excerpt: "An explanation of why I'm shutting EchoFeed"
tags:
    - EchoFeed
---

> [!NOTE] TL;DR
> I'm shutting down [EchoFeed](https://echofeed.app) within the next 12 months when the final subscriptions expire. It will continue to run as it is until then so if you've already paid you have access until the end of your subscription. 

Last night, after a few months on and off of problems with EchoFeed from my side and general feed problems I made the decision to shut it down. As of right now, this is what I've done:

- Registration for new accounts is closed
- Existing free accounts can no longer upgrade to EchoFeed Pro
- Free accounts and their associated Echoes will no longer cross post
- EchoFeed Amplify has been turned off
- All subscriptions have been set to cancel at the end of the billing period

When EchoFeed is running smoothly, it's great. It posts quickly and I think overall most people are happy with it but when I get an email saying there's a problem my heart sinks: it could be a quick reboot fixes it or it could be an endless cycle of fiddling with the database, debugging someone else's feed, or maybe EchoFeed has been blocked for making too many requests[^1]. Sometimes I'd be doing the same fixes every couple of hours, usually overnight because the stress meant I couldn't sleep, only for it to magically be fine again seemingly at random.

The sheer volume of feeds EchoFeed was handling caused some of the problems - hundreds of feeds all need to be checked regularly so updates can be found quickly which adds up to hundreds of jobs a minute. At some point, probably now if I'm honest, EchoFeed would need to be upgraded to multiple servers just for running the fetching which for a service charging $25 a year just isn't sustainable. The price is part of the product in that I want normal people to be able to access it and not start charging enterprise prices for cross posting.

Spam was also a big problem and one thats hard to get a handle on. Requiring email verification stopped a lot of traditional spam but there's an endless supply of crypto bros setting up accounts to cross post their shitty pretend money news websites to Bluesky, sometimes with hundreds of posts a day. I don't have the resources to review every single account and feed. The other type is the paid accounts which have 100s of echoes that just post news sites to mirror accounts on Mastodon and Bluesky. 

Then there's the money. Once you take into account taxes, server and email costs, I make about the same a month as I would charge for a couple of hours work and most months I am spending at least 4-5 hours looking at issues on EchoFeed.

Then there is the issue of feeds in general. No one, including me, gets RSS or Atom feeds entirely right[^2]. EchoFeed's feed fetcher, which _should_ be simple, is filled with multiple lines of code to catch edges cases in different formats, platforms, even some hard-coded personal sites where the platform provider has made a silly mistake. The same is true for the image extraction code - between jpeg, gif, avif, heic, `srcset`, and various CDN techniques, the code is horrible. This part I don't mind because this is the (usually) fun code bit but it's just another reason EchoFeed has become difficult to maintain. 

All of these things, on top of having two young children, have led to to shut down EchoFeed as outlined at the top of the post. It wasn't an easy decision and not one I took lightly. I appreciate the support of everyone who used EchoFeed, paid for it, linked to it, and suggested it as an option for people. I'm particularly grateful for [Adam](https://neatnik.net) who has given me advice from the start of EchoFeed as well as talking through the shut down.

I have some emails to send out to customers and I need to update the home page to reflect the status but those should get those done in the next couple of days.

---

Technical notes. Firstly, I will attempt to get the code in such a state that I can release it for people to run themselves but no promises. 

Secondly, this is the script I used to cancel everyone's subscriptions in Stripe. To get the subscription IDs go to the subscriptions tab in Stripe and export the list.

```js
// `npm install stripe`
import Stripe from 'stripe';

const SUBSCRIPTION_IDS = [
  'sub_XXXXXX',
];

// your API key here
const SECRET = 'sk_live_XXXX'
const stripe = new Stripe(SECRET);
const results = { cancelled: [], failed: [] };

for (const [index, id] of SUBSCRIPTION_IDS.entries()) {
  try {
    const subscription = await stripe.subscriptions.update(id, {
      cancel_at_period_end: true,
    });
    const cancelAt = subscription.cancel_at 
    ? new Date(subscription.cancel_at * 1000).toISOString() 
    : 'unknown date';

    console.log(`${id} — cancels at ${cancelAt}`);
    results.cancelled.push(id);
  } catch (error) {
    console.error(`${id} — failed: ${error.message}`);
    results.failed.push({ id, message: error.message });
  }
}

console.log(`Done. ${results.cancelled.length} scheduled, ${results.failed.length} failed.`);

```

[^1]: I never really thought of a good way to handle this - you want quick updates when a post appears in a feed but it could be days or weeks in between updates and EchoFeed has checked the feed hundreds of times during that span. [WebSub](https://en.wikipedia.org/wiki/WebSub) I think is the solution but it's required at the publishers end and not something I could control.
[^2]: JSON feed is mostly good because [the spec](https://www.jsonfeed.org/) is very clear