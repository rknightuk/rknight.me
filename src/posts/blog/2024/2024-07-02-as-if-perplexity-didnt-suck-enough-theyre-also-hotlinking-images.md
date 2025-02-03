---
title: "As If Perplexity Didn’t Suck Enough They’re Also Hotlinking Images"
permalink: /blog/as-if-perplexity-didnt-suck-enough-theyre-also-hotlinking-images/index.html
date: 2024-07-02T11:31:09.823Z
excerpt: "Perplexity are hotlinking images like the grifters they are"
tags:
    - AI
    - OpenWeb
---

[Ben has an excellent post](https://www.bentasker.co.uk/posts/blog/security/perplexity-ai-gives-answers-that-cannot-be-trusted.html) expanding on [my findings](https://rknight.me/blog/perplexity-ai-is-lying-about-its-user-agent/) about Perplexity ignoring robots.txt. He also digs into the various ways prompt injection does and doesn't work. The entire post is well worth your time but this part really jumped out at me:

> When I searched about creating an end for our sofa, Perplexity [hotlinked](https://en.wikipedia.org/wiki/Inline_linking) some photos from that post which resulting in _my_ browser requesting them from my server.
>
> They're wasting **my** bandwidth to serve content to _their_ users. For many sites, there's a tangible cost associated with every byte served - they are _literally_ costing me money (albeit a small amount)

So not only can't they be trusted to follow the de facto rules about scraping websites, they're also hotlinking? Can they not spare any of the millions of dollars they've raised to actually cache the images they're serving up. "_Might as well just use someone else's bandwidth_". Dickheads.

Ben offers a solution to this for nginx, replacing any request for an image from them with an image stating "perplexity just tried to steal my image and my bandwidth": 

```bash
location ~*  \.(jpg|jpeg|png|gif|ico|bmp)$ {
    # Redirect image fetches from Perplexity AI
    if ($http_referer = "https://www.perplexity.ai/"){
        rewrite (.*) path/to/image/perplexity_ai.jpg redirect;
    }
}
```

I don't host many images directly on this domain but rather put them on [Bunny CDN](https://bunny.net/?ref=b2i4y24apu) so nginx won't help me here. Thankfully, Bunny has a way to [block specific referrers](https://support.bunny.net/hc/en-us/articles/360000236671-How-to-set-up-hotlinking-protection). I don't get to do a funny image but this is close enough.

![Blocking Perplixity in Bunny CDN](https://cdn.rknight.me/site/bunny-referrer-block.jpg)

I know I said my [last post](https://rknight.me/blog/perplexity-ai-robotstxt-and-other-questions/) would be my final word but this really pissed me off. So once again, fuck you Perplexity.

> [!NOTE] Update
> [Lewis](https://lewisdale.dev) pointed out you can use Bunny's edge rules to achieve a redirect based on the header:

![Redirecting to another image in Bunny](https://cdn.rknight.me/site/perplexity-blog-redirect.jpg)