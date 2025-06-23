---
title: "How to Verify an Apple Podcasts Claim in Your RSS Feed"
permalink: /blog/how-to-verify-an-apple-podcasts-claim-in-your-rss-feed/index.html
date: 2025-06-23T21:44:04.130Z
excerpt: "Apple like to hide documentation for podcast things and verifying a claim is no exception"
tags:
    - Development
    - Podcasting
---

If you need to claim a podcast on Apple Podcasts, a show that's linked to another account and you want to move it to yours, you can follow [this guide](https://podcasters.apple.com/support/5497-claim-your-show) which ends with this final step:

> Go to your hosting provider’s website, log in, and enter the token in the appropriate claim field.

Sounds easy enough if you use one of the twenty or so hosting providers that Apple say support this but what if you have a moment of clarity and realise _you are the hosting provider_. What are the hosting providers putting in the RSS feed to validate the claim? Because I couldn't find an Apple support document that explains it, although I'm sure it exists. 

I did thankfully come across [this GitHub issue](https://github.com/podlove/podlove-publisher/issues/1558) on the PodLove publisher repository which had this snippet of code:

```php
echo "\n\t".sprintf('<itunes:applepodcastsverify>%s</itunes:applepodcastsverify>', $verification_token);
```

`itunes:applepodcastsverify` is the key bit of information I needed so I updated my feed with my token Apple gave me when trying to make a claim. Within ten minutes Apple had verified the claim and the show was back in my account.

```diff
<itunes:category text="{{ podcast.category }}"/>
+ <itunes:applepodcastsverify>26f05c10-5044-11f0-b7ac-37b1c324c77d</itunes:applepodcastsverify>
```

As with most things related to Apple podcasts, nothing is particularly well-documented and it's also hard to tell whats part of the general standard and what's proprietary to Apple.