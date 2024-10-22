---
title: "Moving my DNS Records with DNSControl"
permalink: /blog/moving-my-dns-records-with-dnscontrol/index.html
date: 2024-10-22T14:00:05.000Z
excerpt: "Using DNSControl I was able to move ~100 DNS records really easily"
layout: post
tags:
    - Development
    - OpenWeb
---

After [setting up DNSControl](https://rknight.me/blog/setting-up-dnscontrol) I wanted to use it to move away from DigitalOcean[^1] to [Bunny DNS](https://bunny.net/?ref=b2i4y24apu). I'd already moved my servers to [Hetzner](https://hetzner.cloud/?ref=Lt9D9KzKP6UQ) but the DNS was more complicated. This domain, for example, has 45 records for subdomains, CNAMES for Netlify, plus verification stuff so I didn't want to risk moving it manually.

I added my Bunny API keys to `creds.json`, updated my `dnsconfig.js`, adding Bunny as a new provider, and switched the provider in the config for the domain:

```diff
var DSP_DIGITALOCEAN = NewDnsProvider("digitalocean");
+ var DSP_BUNNY = NewDnsProvider("bunny");

D("rknight.me", REG_NONE
-   , DnsProvider(DSP_DIGITALOCEAN)
+   , DnsProvider(DSP_BUNNY)
    , DefaultTTL(1800)
    , A("@", HETZNER_MAIN)
    , A("www", HETZNER_MAIN)
)
```

I ran `dnscontrol push` to push those records to Bunny[^2] and then updated the nameservers in [Hover](https://hover.com/scHIv4WR) so the domain was pointing to Bunny. Hover isn't supported by DNSControl so the nameservers had to be done by me but for registrars that are supported, I was able to have that automated as well. The nameservers for Bunny (`kiki.bunny.net` and `coco.bunny.net`) are automatically set from the registrar, so you don't need to define them yourself as [I found out](https://github.com/StackExchange/dnscontrol/issues/3163#issuecomment-2426650514).

```diff
+ var REG_PORKBUN = NewRegistrar("porkbun"); 

- D("knightshift.dev", REG_NONE
+ D("knightshift.dev", REG_PORKBUN
	, DnsProvider(DSP_BUNNY)
	, DefaultTTL(1800)
	, A("@", HETZNER_MAIN)
	, A("www", HETZNER_MAIN)
	, A("msorc", HETZNER_MAIN)
)
```

Once I'd done that for the other domains I use, I wanted my DNSControl to at least be aware of two other domains that just redirect to my main site (this is handled in Hover). If you set a domain with no registrar and no provider, you'll get an error about having no nameservers. To fix this, I added `{ no_ns:'true' }`. This doesn't actually _do_ anything, but it's handy to have a record of every domain I have in one place.

```js
D("therobb.com", REG_NONE, { no_ns:'true' }); // => rknight.me
```

This setup already came in handy yesterday when I needed to prove ownership of one of my domains: add one line, run `dnscontrol push`, done.

[^1]: after [what they did](https://rknight.me/blog/netcraft-facebook-and-digital-ocean/)
[^2]: There was some shenanigans where someone else had added my domain to their Bunny account which I had to sort out with support, but they were very quick to fix it