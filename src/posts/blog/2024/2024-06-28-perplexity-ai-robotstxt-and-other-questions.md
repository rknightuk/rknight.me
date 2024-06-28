---
title: "Perplexity AI, Robots.txt, and Other Questions"
permalink: /blog/perplexity-ai-robotstxt-and-other-questions/index.html
date: 2024-06-28T11:12:11.506Z
excerpt: "Follow up on the past week or so of Perplexity nonsense"
layout: post
tags:
    - AI
    - OpenWeb
---

Since [I wrote about Perplexity](https://rknight.me/blog/perplexity-ai-is-lying-about-its-user-agent/) it has been reported on by [Wired](https://www.wired.com/story/perplexity-is-a-bullshit-machine/), [Wired again](https://www.wired.com/story/perplexity-plagiarized-our-story-about-how-perplexity-is-a-bullshit-machine/), [Fast Company](https://www.fastcompany.com/91144894/perplexity-ai-ceo-aravind-srinivas-on-plagiarism-accusations?partner=rss&utm_source=feedly&utm_medium=feed&utm_campaign=rss+fastcompany&utm_content=rss), [the Verge](https://www.theverge.com/2024/6/27/24187405/perplexity-ai-twitter-lie-plagiarism), and others. And there's more coming so keep your eyes peeled. I even ended up on [Perplexity's Wikipedia page](https://en.wikipedia.org/wiki/Perplexity.ai#Use_of_content_from_media_outlets). I also spoke at length about all this on [episode 187 of Ruminate](https://ruminatepodcast.com/187/).

The latest article is [this Wired article](https://www.wired.com/story/aws-perplexity-bot-scraping-investigation/) that reports that Perplexity are being investigated by AWS:

> Amazon’s cloud division has launched an investigation into Perplexity AI. At issue is whether the AI search startup is violating Amazon Web Services rules by scraping websites that attempted to prevent it from doing so, WIRED has learned.

Perplexity's CEO has said the bots ignoring robots.txt were third-parties so totally not their fault. The Verge:

> “Someone else did it” is a fine argument for a five-year-old

It also turns out Perplexity were previously [faking academic accounts on Twitter](https://www.404media.co/perplexitys-origin-story-scraping-twitter-with-fake-academic-accounts/) in order to scrape the service and provide that data as a search corpus. Perplexity's CEO is pretty proud of it:

> “So we built all this into a good search experience over Twitter, which we scraped with academic accounts just before Elon took over Twitter,” Srinivas said on the podcast. “Back then Twitter would allow you to create academic API accounts and we would create like, lots of them with like generating phone numbers, writing research proposals with GPT.”

So basically Perplexity don't give a shit about the rules or consent. Cool.

I've also had a lot of comments and emails since my post went up that I want to address here because the same things keep coming up quite a lot.

**_Why do you hate AI?_**

I don't, although it is a bit shit right now. What I hate is billion-dollar companies ignoring the rules and profiting of others people's work without compensating them.

**_This is a pointless exercise, why not just give up trying to block them?_**

Maybe it is futile but I'm not going to stop trying just because it's hard. I have every right to try and block them or [send them to a 10GB `bin` file](https://social.lol/@robb/112687421287583132).

**_If you don't want your stuff to be taken then don't post it on the web!!!1_**

If you don't wanna get hit round the head with a cricket bat don't go outside without a helmet.

**_Of course they're going to ignore robots.txt, you're an idiot for thinking they would follow it._**

Not a question, more of a comment but okay. Robots.txt, despite never being a law, has worked pretty well up until now. Now the silicon valley tech bros are here doing whatever the fuck they want.

Finally, I recently gave a comment to a reporter from [Nikkei](https://nikkei.com) which I think sums up my thoughts well now I've had a couple of weeks of thinking about this:

> I find the behavior of Perplexity and others in this space problematic because we have, until very recently, had a web where search engines and other bots have respected robots.txt. It's the de facto standard for saying who can and cannot access your content. Although it's not a legal standard it has, for the most part, worked well since its invention in the 90s. But now AI companies funded by huge amounts of money think that because it would be hard to ask for permission they just take whatever they want with complete disregard for the content owners wishes and legal rights.
>
> Even Apple decided to scrape the open web and only _after_ they'd done that did they reveal the user agent they were using so we can opt out, but it's too late because they've already scraped everything.
>
> At a minimum I expect any company scraping the web to respect the robots.txt and document which user agents and IP addresses they use, so that content owners can make a choice.

Ideally I'd like this to be my final post on the topic for a while, but we'll have to see how that investigation goes.