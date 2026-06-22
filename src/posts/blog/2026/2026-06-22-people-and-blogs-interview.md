---
title: "People and Blogs Interview"
permalink: /blog/people-and-blogs-interview/index.html
date: 2026-06-22T09:48:50.369Z
excerpt: "Reposting my interview from People and Blogs"
repost: This article originally appeared on <a href="https://manuelmoreale.com/interview/robb-knight">People and Blogs</a>
---

**Let's start from the basics: can you introduce yourself?**

I'm a developer and dad to two girls living in Portsmouth on the south coast of the UK. By day I work for a SaaS company and in my own time I work on my [many side projects](https://rknight.me/projects). In a previous life I worked at a certain clown's restaurant which is where I met my wife some 15 years ago. 

Although developer is what I get paid to do I'm trying to move towards more _making_; websites, [stickers](https://rknight.me/blog/stickers-maths-and-postage/), shirts, art, whatever. I have no idea what that looks like yet or how it's going to pay my bills. I have a whole host of [side projects](https://rknight.me/projects) I've worked on over the years; they're not all winners but they all serve, or served, a purpose. If I get lucky, they resonate with other people which is always nice.

**What's the story behind your blog?**

I've had a lot of blogs over the years, most of which would get a handful of posts before being abandoned. There was a version that ran on Tumblr which I did do for at least a year or two — any interesting posts from that have been saved. The current iteration is by far the longest serving and will be the final version. There's no chance of me wiping it all and starting again.

This current version is part of my main website which is where I put _everything_. My toots on Mastodon start life as a [note post](https://rknight.me/notes), I post [interesting links I find](https://rknight.me/links/), and I log all the media I watch/play/whatever (I don't want to say consume, that's gross) in [Almanac](https://rknight.me/almanac/), which itself is on the third or fourth iteration.

As I said above, I had done a few posts on the Tumblr-powered blog but if I look at my stats for posts, it was around 2022 when Twitter started to fall apart that I started to blog more. I was moving away from posting things directly onto social media sites and getting it onto my own site. 

I started writing more posts that just had a short idea or helpful tip because I realised not every post has to be some incredible think piece. My analytics show that these posts also tend to be the most popular which probably says more about the state of large, ad-riddled websites than it does about my writing. For example [this post about disconnecting Facebook from Spotify](https://rknight.me/blog/convert-spotify-facebook-to-email-login/) is consistently in the top five posts on my site but you're never going to read that post unless you specifically need it. It's not a "good" post, it just exists.

**What does your creative process look like when it comes to blogging?**

To call what I have a process would be a very liberal use of the word "process". If I have nothing to write about I just won't write anything, I have no desire to keep to a schedule and write just for the sake of it. Usually, I'll get prompted by something someone asks like "How did you do X on your website?" or I feel like I have something to say that would be interesting other people.

I write my posts in Obsidian, then when they're ready to go I'll add them to my site. If I'm on my ~~proper computer~~ laptop I use [my CLI tool](https://rknight.me/blog/my-blogging-workflow/) to add a new post. If I'm on mobile, I use the very [haphazard CMS](https://github.com/rknightuk/knightcms) I built. 

I'll proof read most things myself before posting and I rarely ask for anyone else's input but if I do want a second opinion it's going to be previous [P&B interviewee](https://manuelmoreale.com/interview/keenan), [Keenan](https://gkeenan.co). Usually I'm able to get out what I want to say fairly succinctly without too much editing.

**Do you have an ideal creative environment? Also do you believe the physical space influences your creativity?**

A proper keyboard and ideally a desk to sit at is what I prefer when I'm writing (or coding) but I can live with just the keyboard. My desk setup makes some people's skin crawl because there's so much going on but I like having all the trinkets and knick knacks around me.

![A desk surrounded by bookshelves and pegboard with various items hanging from them](https://cdn.rknight.me/site/desk-2025.jpg)

I deeply dislike using my phone for most things outside of scrolling lists, like social media so I rarely write long posts on it. The small form factor just doesn't work for me at all but I also kind of need it to exist in the world.

**A question for the techie readers: can you run us through your tech stack?**

All my domains are registered with [Porkbun](https://porkbun.com) and I manage the DNS with [DNSControl](https://dnscontrol.org/) - my main domain, rknight.me, has nearly 50 records for subdomains so managing those without DNSControl would not be a fun activity. Speaking of DNS I use [Bunny](https://bunny.net) for my DNS management and also use their CDN for images and other files I need to host.

The website itself is, as are many of my side projects, built with [Eleventy](https://www.11ty.dev). Eleventy gives me the flexibility to do some interesting things with the posts and other content on my site which would be much harder with some other systems.

The site gets built on [Forge](https://forge.laravel.com/) to a [Hetzner](https://www.hetzner.com/) server whenever I push an update to GitHub either via command line, or through the aforementioned CMS, and is also triggered at various points in the day to pull in my Mastodon posts.

**Given your experience, if you were to start a blog today, would you do anything differently?**

Assuming I actually had to the time to do it, I think I would start with the CMS first, before building anything of the actual site. It is a pain to update things when I'm not at my laptop but jamming features into my CMS is equally frustrating. 

If I wanted something off the shelf and easier to maintain I suspect I would choose [Ghost](https://ghost.org/) or [Pika](https://pika.page/).

**Financial question since the Web is obsessed with money: how much does it cost to run your blog? Is it just a cost, or does it generate some revenue? And what's your position on people monetising personal blogs?**

Many of these costs are part of my freelancing so are bundled with other sites I run and somewhat hidden but I'll do my best to outline what I do use.

I have a single server on Hetzner that serves my main site as well as another 30 or so side projects so the cost is negligible per-site but it costs about $5 a month. Forge costs $12 a month to deploy my site along with other sites. The domain is $20 a year I think but that's it.

I have a [One a Month Club](https://oneamonth.club/) [here](https://buymeacoffee.com/rknightuk/membership) and I have a handful of people supporting that way. I also use affiliate links for services I use and like which occasionally pays me a little bit.

I think monetising blogs is fine, if it's done in a tasteful way. Dumping Google ads all over your site is terrible for everyone but hand-picked sponsors or referrals is a good way to find new services. Just keep it classy.

**Time for some recommendations: any blog you think is worth checking out? And also, who do you think I should be interviewing next?**

I want to read sites that are about the person writing them. Photos of things people have done, blog posts about notebooks, wallpaper, food, everything. Things people enjoy.

This is the second time I'm going to mention [Keenan](https://gkeenan.co/avgb/) here because they write so wonderfully. They also have a podcast with [Halsted](https://cygnoir.net/about) called [Friendship Material](https://friendship-material.simplecast.com) which is all kinds of lovely and joyful and everyone should listen.

[Alex](https://alexwlchan.net) writes some really interesting computing-related posts, like this one about using [static websites as tiny archives](https://alexwlchan.net/2024/static-websites/).

[Annie](https://anniemueller.com) is so smart and honest in her writing it brings me joy every time I see a new post from her. [This post is a masterpiece](https://anniemueller.com/posts/how-i-a-non-developer-read-the-tutorial-you-a-developer-wrote-for-me-a-beginner).

**Final question: is there anything you want to share with us?**

I'd be a terrible business boy if I didn't at least mention [EchoFeed](https://echofeed.app), an RSS cross posting service I run. 

I also [have a podcast](https://ruminatepodcast.com) that used to be about tech but is now about snacks.