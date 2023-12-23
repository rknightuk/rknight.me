---
title: "Just Delete Me: Ten Years Later"
permalink: /blog/just-delete-me-ten-years-later/index.html
date: 2023-08-18T12:44:06.279Z
excerpt: "Ten years ago we launched JustDelete.me"
layout: post
tags:
  - Development
---

Ten years ago [Ed Poole](https://www.edpoole.me/) and I [launched Just Delete Me](https://hellsite.rknight.me/369368988762906626/). Just Delete Me, as I [described it at the time](https://rknight.me/just-delete-me/), was:

> a directory of urls to delete your account from web services

I wrote three blog posts in first ten days which you can read here:

- [Just Delete Me](https://rknight.me/just-delete-me/)
- [24 Hours of Just Delete Me](https://rknight.me/24-hours-of-just-delete-me/)
- [JustDelete.me: One Million Page Views](https://rknight.me/just-delete-me-one-million-page-views/)

As I recall we made it over the course of one Sunday afternoon and launched it the day after. The first day it had a decent amount of visitors (~3000) and then seemingly overnight it got picked up everywhere, including some huge sites:

- [Mashable](https://mashable.com/archive/justdelete-me)
- [Wired](https://www.wired.com/2013/08/just-delete-me/)
- [Slate](https://slate.com/technology/2013/08/just-delete-me-how-to-delete-your-account-on-amazon-netflix-skype-et-al.html)
- [CNET](https://www.cnet.com/culture/how-to-delete-your-web-accounts-with-justdelete-me/)
- [Neil Gaiman](https://neil-gaiman.tumblr.com/post/59537088319/futurejournalismproject-delete-yourself-from) reblogged it on his Tumblr

We spent the next week or two frantically merging pull requests for new sites, going from the 16 we started with to over 100 in a very short space of time. We hit one million page views within nine days of launching and I was interviewed by the Wall Street Journal and a BBC radio station (I don't remember which one nor do I have the recording). 

A few days after this I added a service to the site and marked it as difficult to delete, then tweeted about it. Within hours I got an email from their CEO (I won't name him but I will say maybe he had a day phone and a night phone) who was annoyed we had marked them as such and wanted to know what he could do to change that. To the best of my knowledge, they never actually did anything about it.

The only way to contribute to the site was to open a pull request on Github which wasn't great for non-developers so I set up a Google form to collect suggestions and links. We got so many pull requests I completely forgot about the form for a couple of months. When I did remember about it and logged in to have a look I was genuinely surprised to see there was thousands of submissions but most of them weren't suggestions for sites. There was hundreds of submissions that included peoples usernames and passwords for various sites (_loads_ of Facebook ones) because they thought the form was a way to get _me_ to delete their accounts. I promptly deleted that form and the associated sheet, I did not want to be responsible for that data.

Thanks to contributors the site eventually had translations into 20 or so languages and grew to have 476 sites listed at the time I sold it. At some stage in the first few months we put Google ads on the site (gross) and it paid my, admittedly small, rent for the next 2 years (not gross). 

Unfortunately the person I sold it to let it go stagnant (turns out they just wanted the domain) but someone forked the project, put it up on a new domain ([https://justdeleteme.xyz/](https://justdeleteme.xyz/)) and continued adding sites. It now has over 1500 sites and services listed. This forked project also spun off two other projects based on the same premise: [Just Get My Data](https://justgetmydata.com) and [Just What's The Data](https://justwhatsthedata.github.io/). 

The original version of the site was built with ~~hopes, dreams, and duct tape~~ a makefile and a whole lot of json files. If I was going to make this exact site today it would be significantly easier with [Eleventy](https://www.11ty.dev/) data files and I could probably avoid a lot of the merge conflicts we had in the early days with a better data structure. I also definitely wouldn't put Google ads on the site.

Just Delete Me is still my most popular project at least in terms of page views, although the [Monzo Pot Image Generator](https://potimages.rknight.me/) has definitely been more consistent in terms of visits (and ~55k images generated).

Here's every link I collected about the site back then. Given it's been 10 years I'm guessing a lot of these are dead now.

- [50 Best Websites 2014](http://time.com/3054279/50-best-websites-2014/)
- [Video - Just Delete Me -- New Website Helps Users Delete Personal Info From Sites - WSJ.com](http://live.wsj.com/video/tired-of-being-on-facebook-just-delete-me/39305F59-6E77-4BC8-B3F3-5DDE9D69347A.html#!39305F59-6E77-4BC8-B3F3-5DDE9D69347A)
- [Welcome to the counter-revolution](http://www.theage.com.au/digital-life/consumer-security/welcome-to-the-counterrevolution-20140308-34e1v.html)
- [How To Remove Yourself From The Internet](http://readwrite.com/2014/02/05/how-to-remove-yourself-from-the-internet#awesm=~ov27CdupU0RRa3)
- [10 Can't Miss Productivity Apps Released in 2013](https://zapier.com/blog/productivity-apps-2013/)
- [You can remove yourself from the Internet one website at a time with this](http://bgr.com/2013/12/17/remove-internet-accounts-just-delete-me/)
- [JustDelete.Me is an Eye-Opener](http://www.intego.com/mac-security-blog/justdelete-me-is-an-eye-opener/)
- [How to disappear completely…Online](http://www.ebuyer.com/blog/2013/12/how-to-disappear-completely-online/)
- [University of Portsmouth students deleting website proves popular](http://www.portsmouth.co.uk/news/education/university-of-portsmouth-students-deleting-website-proves-popular-1-5491597)
- [Smashing Newsletter: Issue #97](http://www.smashingmagazine.com/smashing-newsletter-issue-97/)
- [Good Picks # 14: UX Design - Float Label Pattern - JustDeleteMe](http://www.onemorethingstudio.com/blog/2013/11/18/bonnes-pioches-14-ux-float-label-pattern-justdeleteme/)
- [justdelete.me: Delete accounts & quit web services with ease](http://www.jamrelian.com/justdelete-me-delete-accounts/)
- [Delete those Unwanted Online Accounts](http://www.davescomputertips.com/delete-those-unwanted-online-accounts/)
- [10 steps to building and managing your personal brand](http://www.prdaily.com/Main/Articles/15573.aspx)
- [Deleting online trail proves difficult](http://www.clickorlando.com/news/deleting-online-trail-proves-difficult/-/1637132/22979182/-/cvnolwz/-/index.html)
- [Best Websites](http://www.makeuseof.com/pages/best-websites)
- [Domain of the Month, November: JustDelete.Me](http://www.hover.com/blog/domain-of-the-month-november-justdelete-me/)
- [Webscape: Making exercise a game](http://www.bbc.co.uk/news/technology-24463390)
- [One Easy Way To Stop Target And Other Companies From Selling Your Data](http://www.forbes.com/sites/adamtanner/2013/10/02/one-easy-way-to-stop-target-and-other-companies-from-selling-your-data/)
- [Vanish from the Web with justdelete.me | Star Tribune](http://www.startribune.com/lifestyle/225069852.html)
- [Students Create Site For Deleting Old Accounts - Heart South Coast News](http://www.heart.co.uk/southcoast/news/local/students-create-site-deleting-old-accounts/)
- [Zuck off, Zuck: Brit duo's JustDelete.Me nukes clingy web accounts • The Register Forums](http://forums.theregister.co.uk/forum/1/2013/09/13/students_embark_on_mission_to_delete_you_from_the_internet/)
- [New one-stop shop for deleting internet accounts | UoP News](http://www.port.ac.uk/uopnews/2013/09/11/new-one-stop-shop-for-deleting-internet-accounts/)
- [Want To Delete Yourself From The Internet? New Web App Helps You Do Just That! | Redmond Pie](http://www.redmondpie.com/want-to-delete-yourself-from-the-internet-new-web-app-helps-you-do-just-that/)
- [You can vanish from the internet, but it'll take work - Vote for the best company in Albany's business competition](http://www.bizjournals.com/albany/blog/socialmadness/2013/08/how-to-disappear-from-the-internet.html)
- [Vanish from the Internet with JustDelete.me | TechBeat](http://techbeat.com/2013/09/vanish-from-the-internet-with-justdelete-me/)
- [Grapevine Texas Apartments | Grapevine Station Apartments](http://apartments.naproperties.com/texas/grapevine/grapevine-station-apartments/news?__rmid=erase_yourself_from_the_intern-239860063.html&xrs=RebelMouse_tw)
- [Justdelete.me Wants To Help You Pull The Plug On All Those Pesky Online Accounts | iyaan.info](http://iyaan.info/justdelete-me-wants-to-help-you-pull-the-plug-on-all-those-pesky-online-accounts/)
- [JustDeleteMe, come pulire le nostre tracce sul Web - Repubblica.it](http://www.repubblica.it/tecnologia/2013/08/29/news/pulire_tracce_web-65493280/?ref=fbpr)
- [Just Delete Me | The Fluffy Heads](http://thefluffyheads.com/techie-tony/just-delete-me)
- [Just Delete Me: An App That Lets You Disappear, Quicker | COUNSEL](http://www.lowecounsel.com/blog/2013/08/just-delete-me-app-lets-you-disappear-quicker)
- [How to Cancel Online Accounts the Easy Way](http://www.techsupportalert.com/content/how-cancel-online-accounts-easy-way.htm)
- [DT Daily: iPhone trade-in, justdelete.me, White Xbox One - Watch List News](http://www.watchlistnews.com/2013/08/26/dt-daily-iphone-trade-in-justdelete-me-white-xbox-one/)
- [Just Delete Me: Helps You Erase Your Online Presence](http://www.bitrebels.com/technology/just-delete-me-service-directory/)
- [Got a Bunch of Ignored Online Accounts? Say Hello to JustDelete.me - Technorati Technology](http://technorati.com/technology/article/got-a-bunch-of-ignored-online/)
- [Neil Gaiman](http://neil-gaiman.tumblr.com/post/59537088319/futurejournalismproject-delete-yourself-from)
- [Easily delete unwanted online accounts - Cool Sites from The Kim Komando Radio Show® & Web site](http://www.komando.com/coolsites/index.aspx?id=15113)
- [Learn how to cancel your online accounts | PCWorld](http://www.pcworld.com/article/2047632/learn-how-to-cancel-your-online-accounts.html)
- [JustDelete.Me: Are You Tired of Your Social Media Profile? - Domain.ME](http://domain.me/justdelete-me/)
- [JustDelete.Me Removes Your Web Traces; Attracts 5,00,000 Views In Its First Week | CrazyEngineers](http://www.crazyengineers.com/threads/justdelete-me-removes-your-web-traces-attracts-5-00-000-views-in-its-first-week.70308/)
- [JustDelete.Me makes cleaning up your online identity easy | FOX2now.com](http://fox2now.com/2013/08/28/justdelete-me-makes-cleaning-up-your-online-identity-easy/)
- [The FJP — Delete Yourself From Web Services With...](http://tumblr.thefjp.org/post/59394819304/delete-yourself-from-web-services-with-justdelete-me)
- [Justdelete.me – Close Your Online Accounts Easily](http://www.wonderoftech.com/justdelete-me-close-your-online-accounts-easily/)
- [JustDelete.me helps you wash away your digital life | Fox News](http://www.foxnews.com/tech/2013/08/27/justdeleteme-helps-wash-away-your-digital-life/)
- [5by5 | The News #134: Monday, August 26, 2013](http://5by5.tv/news/134)
- [Site facilitates removal of your data from the Internet](http://www.redbull.com.br/cs/Satellite/pt_BR/Article/Site-facilita-retirada-dos-seus-dados-da-Internet-021243357182040)
- [synaix BLOG](http://blog.synaix.de/2013/08/justdelete-me-das-loeschregister-im-internet-hilft-uns-beim-aufraeumen-unserer-accounts/)
- [JustDelete.me Helps You Delete Unused and Unwanted Online Accounts | Digital Trends](http://www.digitaltrends.com/web/justdelete-me-helps-delete-unused-online-accounts/)
- [Just Delete Me: How to delete your account on Amazon, Netflix, Skype, et al.](http://www.slate.com/blogs/future_tense/2013/08/26/just_delete_me_how_to_delete_your_account_on_amazon_netflix_skype_et_al.html)
- [Justdelete.me Wants to Help You Unplug From the Internet for Good](http://dashburst.com/just-delete-me/)
- [How to delete your Web accounts with JustDelete.me | How To - CNET](http://howto.cnet.com/8301-11310_39-57600044-285/how-to-delete-your-web-accounts-with-justdelete.me/)
- [Strombo | Want To Delete Yourself From The Internet? This Site Can Help](http://www.cbc.ca/strombo/technology-1/want-to-delete-yourself-from-the-internet-this-site-can-help.html)
- [Erase Your Web Presence With The Click Of One Button - PSFK](http://www.psfk.com/2013/08/erase-web-presence.html)
- [JustDelete.Me: New Free Website To Delete Search Listings, Close Online Accounts And Remove Personal Information From The Web - International Design Times](http://www.idesigntimes.com/articles/7347/20130826/just-delete-me-new-free-website-search-close-account.htm)
- [Site helps user to cancel online services and 'disappear' from the internet - Anonymous Brazil](http://www.anonymousbrasil.com/tecnologia/site-ajuda-usuario-cancelar-servicos-online-desaparecer-internet/)
- [How to Escape Social Media with JustDelete.Me](http://blogs.phoenixnewtimes.com/jackalope/2013/08/justdeleteme_social_media_delete_facebook_off_the_grid.php)
- [JustDelete.me Offers Advice About How To Delete Digital Footprint From Internet](http://www.opposingviews.com/i/technology/justdeleteme-offers-advice-about-how-delete-digital-footprint-internet#)
- [JustDelete.me Helps You Delete Your Account from 100+ Web Services](http://everything-pr.com/justdelete-me/245353/#.UhtuCGSDQ18)
- [Disappears from the internet! | Tportal.hr](http://www.tportal.hr/scitech/tehno/282123/Nestanite-s-interneta.html)
- [Supprimez facilement vos comptes en ligne avec JustDelete.me](http://www.gizmodo.fr/2013/08/26/supprimez-comptes-ligne-justdelete-me.html)
- [The Daily Dot - Just Delete Me helps you painlessly wipe out all your Web accounts](http://www.dailydot.com/lifestyle/just-delete-me-web-accounts/)
- [Justdelete.me wants to help you commit social suicide – Daily Gadgetry](http://dailygadgetry.com/justdelete-me-wants-to-help-you-commit-social-suicide/1629)
- [Just Delete Me helps cancellation of Internet services](http://stadt-bremerhaven.de/just-delete-me-hilft-bei-der-abmeldung-von-internet-diensten/)
- [Enrol yourself Delete Facebook, Twitter or Google with Justdelete.me - ComputerHoy.com](http://computerhoy.com/noticias/internet/borrate-facebook-twitter-google-justdeleteme-5893)
- [Justdelete.me Wants To Help You Pull The Plug On All Those Pesky Online Accounts | TechCrunch](http://techcrunch.com/2013/08/23/justdelete-me-wants-to-help-you-pull-the-plug-on-all-those-pesky-online-accounts/)
- [Deleting online services you no longer want or need, the easy way | Security Spread](http://securityspread.com/2013/08/24/deleting-online-services-longer-need-easy/)
- [Just-delete-me a help to unsubscribe from the web](http://www.mondoinformazione.com/notizie-estero/cancellarsi-dal-web-just-delete-me/113651/)
- [Just Delete Me Removes You from the Internet](http://news.softpedia.com/news/Just-Delete-Me-Removes-You-from-the-Internet-377984.shtml)