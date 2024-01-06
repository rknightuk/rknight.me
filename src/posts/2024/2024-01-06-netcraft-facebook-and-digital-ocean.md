---
title: Netcraft, Facebook, and Digital Ocean
permalink: /blog/netcraft-facebook-and-digital-ocean/index.html
date: 2024-01-06T12:18:26.504Z
excerpt: "Facebook, via Netcraft, falsely reported a blog post of mine as phishing and Digital Ocean threatened to suspend my server"
layout: post
tags:
    - SocialMedia
    - OpenWeb
---

Now I’ve calmed down after [my tootstorm](https://social.lol/@robb/111704215593992932), here’s what happened yesterday with Netcraft, Facebook, Digital Ocean, and [this blog post](https://rknight.me/blog/convert-spotify-facebook-to-email-login/).[^1]

At 4:06pm I received an email from DigitalOcean that said the following:

> We’ve received a report that there may be phishing material hosted on your Droplet at 164.92.144.168 .     
> 
> You can review the report that’s caused this ticket to be generated at [this link](https://digitalocean.abusehq.net/share/lG5vYXDEhSgX8VhNqkLfLp9YQSXQPSR680kmsD2DGMKpMdQg__0vduxKMLfCXEHh).    
 >
> We’re currently reviewing this complaint, but wanted to notify you as soon as possible so that you can investigate and remove the content, as it is extremely harmful.   
> 
> After you’ve reviewed the above report and removed the listed content - should you determine the content is phishing - we’d appreciate it if you would update this ticket so we can mark the matter as resolved.

And then this one three minutes later:

> We have not taken any action at this time regarding this complaint, but request you address it within the next 24 hours.  Please note that if we do not hear from you and the content is still active at that time we may take additional action to prevent access to the phishing material, up to and including temporary suspension of the Droplet involved.

So what's happened here:

1. Netcraft are contracted by Facebook to look for phishing sites related to Facebook, fair enough.
2. Netcraft have decided through whatever method that my blog post is attempting to phish Facebook login details.
3. They have sent an abuse report to Digital Ocean, without a human reviewing it.
4. Digital Ocean received this report and sent me the report claiming the post is "_extremely harmful_". No human involved again.

So Netcraft, on behalf of Facebook, had decided that my blog post was phishing and Digital Ocean have taken that at face value. Note the wording from here: "_...so you can investigate and remove the content, as it is extremely harmful._" and "_...if we do not hear from you and the content is still active at that time we may take additional action to prevent access to the phishing material_". So I'm hosting dangerous phishing content and also my droplet will be suspended if I don't remove the post? Why has this email been sent before _anyone_ at DO even reviewed it. 

Had I not done anything because I was busy, or whatever I might have been doing, my droplet would have been suspended on a baseless claim? These emails, quite frankly, are shitty. 

I reported this on Netcraft's abuse page as as false positive and got these two generic responses back a while later:

> [Opsgenie] Ben Golding acknowledged alert: False positive report for takedown incident 3ee0db5c9a6a

> We have reviewed the site and agree that it was incorrectly identified as phishing. We have now halted the takedown process and sent retraction messages to all parties contacted. We have also removed the site from our phishing blocklist.

"_...agree that it was incorrectly identified_". Wow how do you do it with only [$100m in funding](https://www.helpnetsecurity.com/2023/07/18/netcraft-funding-100-million/). Truly incredible.

I replied to Digital Ocean with the following:

> The page mentioned in the abuse report ([https://rknight.me/blog/convert-spotify-facebook-to-email-login/](https://rknight.me/blog/convert-spotify-facebook-to-email-login/)) is not in any way related to phishing or targeting Facebook customers. It is a blog post outlining how to unlink a Facebook account from Spotify. At no point does it request user information, or advise sharing personal details with myself or any third party.
> 
> No action should be taken here. The abuse report from Netcraft is completely frivolous and inaccurate.

And they did reply, four hours later:

> Thanks for sharing that update. It looks like this was a false positive, sent over via Netcraft. There's no reason to worry, this won't be suspended. Sometimes, entities will go through these brand protection agencies a bit overzealously. We just ask that folks share a timely update to any reports of this type, as noted in that original messaging. I'll close this ticket out. If we receive any future reports, we'll always forward those along in the spirit of transparency.

"_Sometimes, entities will go through these brand protection agencies a bit overzealously_". And yet you take them at face value anyway? Not good enough.

The same person[^2] then replied again, having seen my tootstorm probably from [Hacker News](https://news.ycombinator.com/item?id=38880713), a few hours later:

> Just wanted to loop back around here since I saw the Mastodon thread and realized that there's likely a bit more information that can be useful here. Couldn't share it publicly, since it'd be inappropriate to share details related to your personal account and ticket. I also realize that "there's no need to worry" can sound inconsiderate in a medium that lacks accent, tone, and the usual mannerisms that provide context to our speech. I do apologize if that read as dismissive. That is certainly not the intent.

Okay I can agree with that. Intent isn't easy to convey in email. I think this was a direct response to [this toot](https://social.lol/@robb/111705237720008830).

> To be a bit more specific, there was never a risk of this Droplet being deleted, blocked or of your account having any restrictions in place.

Really? Because the previous email says "..._up to and including temporary suspension of the Droplet_". Sure sounds like restrictions to me. Then some more general information about how the reporting system works, included here for the sake of completeness.

> In instances of reported phishing, we automatically pass along the initial report to maintain transparency and ask for either a response or the content removed. I don't think it'd be appropriate of us to withhold details of companies issuing such reports against our customers, and this ask is typically a reasonable one, allowing us to easily sort out the issue with the customer taking a look and sharing their perspective on the matter if they feel the report is unreasonable. Without response or the content being removed, we don't have automated actioning at this stage and would require our team to manually review the report, the content in dispute, as well as the whole of your customer account. We have the discretion to throw out any report that doesn't align with our expectations, which would naturally occur here.  
  >
> Beyond phishing, our abuse team has a number of safeties baked into our infrastructure that intentionally limit us from taking action against Droplets or accounts like yours. I totally get that it can be alarming to get an alert like this, and that without the understanding shared, it can seem a bit scarier than it is. Also, worth emphasizing that no one twisted my arm to share this. I just wanted to make sure we could be as transparent as possible with you as possible and represent the work our team does in a better light, since it's certainly a hard-working group of folks.

To be clear on that last point, I don't think any single person is to blame here, nor do I think the staff at Digital Ocean are being deliberately malicious. I do, however, think the wording of the initial emails are outrageously threatening and don't line up with what allegedly would have happened if I'd done nothing.

This _is_ all resolved now; my droplet isn't being suspended but I'm already in the process of moving my sites to [Hetzner](https://www.hetzner.com/). Maybe their abuse process is just as bad as Digital Ocean, maybe it's not but that's not the point. On principle, I'm moving everything.

[^1]: I'm sure this has happened before on this blog post but I can’t find any toots, tweets, or emails from me to confirm this. 
[^2]: I say "the same person" but the email is signed off as "Security Operations DigitalOcean Security" so I don't know 100% if it was the same person or not.