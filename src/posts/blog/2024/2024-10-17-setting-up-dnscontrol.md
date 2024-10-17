---
title: "Setting Up DNSControl"
permalink: /blog/setting-up-dnscontrol/index.html
date: 2024-10-17T20:36:45.692Z
excerpt: "A quick overview of getting started with DNSControl"
layout: post
tags:
    - Development
    - OpenWeb
---

When I linked to [this post about DNS](https://alexwlchan.net/2024/documenting-my-dns/), [Dave replied](https://social.lol/@rail/113322023046758075) and mentioned he uses [DNSControl](https://dnscontrol.org) for managing this kind of stuff. I'd heard of it before but never actually looked into what it did so I jumped into the [getting started guide](https://docs.dnscontrol.org/getting-started/getting-started). I'd recommend reading that if you want a more in-depth guide, this post is just an overview of what I did to get what I wanted accomplished.

No detailed install steps here, check out the official docs, but the short version is this: install DNSControl (`brew install dnscontrol`), make a directory with a `zones` directory inside it, then make two files: `dnsconfig.js` and `creds.json` (don't forget to put `creds.json` in your `.gitignore` if you plan on using git for this).

```bash
mydnsconfig
├── zones
├── dnsconfig.js
├── creds.json
└── .gitignore
```

I currently have nine domains and all the DNS is managed at DigitalOcean (for now) so my `creds.json` file looks like this:

```json
{
    "bind": {
        "TYPE": "BIND"
    },
    "digitalocean": {
      "TYPE": "DIGITALOCEAN",
      "token": "MY_TOKEN"
    }
}
```

I didn't want to have to manually input all the records into the config but thankfully DNSControl has an option to fetch existing records to generate the config for a specific domain which you can then copy into the `dnsconfig.js` file.

```bash
$ dnscontrol get-zones --format=djs digitalocean DIGITALOCEAN slashpages.net

D("slashpages.net", REG_CHANGEME
	, DnsProvider(DSP_DIGITALOCEAN)
	, DefaultTTL(3600)
	//, NAMESERVER("ns1.digitalocean.com.")
	//, NAMESERVER("ns2.digitalocean.com.")
	//, NAMESERVER("ns3.digitalocean.com.")
	, A("@", "49.13.76.163")
	, A("www", "49.13.76.163")
)
```

I ran that for all my domains so my config ended up looking something like this. I've removed some records here for the sake of keeping it short.

```js
var REG_NONE = NewRegistrar("none");    // No registrar.
var DNS_BIND = NewDnsProvider("bind");  // ISC BIND.
var DSP_DIGITALOCEAN = NewDnsProvider("digitalocean");

var HETZNER_MAIN = '49.13.76.163';

D("rknight.me", REG_NONE
	, DnsProvider(DSP_DIGITALOCEAN)
	, DefaultTTL(1800)
	//, NAMESERVER("ns1.digitalocean.com.")
	//, NAMESERVER("ns2.digitalocean.com.")
	//, NAMESERVER("ns3.digitalocean.com.")
    , A("@", HETZNER_MAIN)
    , A("www", HETZNER_MAIN)
    // lots of subdomain setups go here
)

D("slashpages.net", REG_NONE
	, DnsProvider(DSP_DIGITALOCEAN)
	, DefaultTTL(1800)
	//, NAMESERVER("ns1.digitalocean.com.")
	//, NAMESERVER("ns2.digitalocean.com.")
	//, NAMESERVER("ns3.digitalocean.com.")
	, A("@", HETZNER_MAIN)
	, A("www", HETZNER_MAIN)
)
```

You can run `dnscontrol preview` to check what you have in the config matches what's on the DNS provider. If there's any differences, it will tell you.

```bash
$ dnscontrol preview

******************** Domain: rknight.me
1 correction (digitalocean)
#1: ± MODIFY A api.rknight.me: (123.45.67.99 ttl=1800) -> (123.45.67.89 ttl=1800), DO ID: 359463019
******************** Domain: echofeed.app
******************** Domain: bugle.lol
******************** Domain: coinme.dad
******************** Domain: deskmat.help
******************** Domain: knightshift.dev
******************** Domain: ruminatepodcast.com
******************** Domain: slashpages.net
******************** Domain: wegot.family
Done. 1 corrections.
```

Running `dnscontrol push` will the sync these changes to the DNS provider. For this domain, I have 45 records so the idea of moving off of DigitalOcean was daunting but now I've got this setup it should be a lot easier to switch to one of the 35 providers that DNSControl supports.