---
title: "Guide: Use Geektool to Show Twitter Updates on Your Desktop"
permalink: /guide-use-geektool-to-show-twitter-updates-on-your-desktop/
date: 2011-04-11 17:00:31
layout: post
---

Geektool is an amazing, well, tool for displaying a wealth of information on your desktop. From battery percentage to uptime, Geektool can do pretty much anything you want it to. So how about showing updates from a Twitter user such as, in this case, [@BroTipsHQ](http://twitter.com/brotipshq)?

![Bro Tips #175](http://therobb.com/wp-content/uploads/2011-04-brotipsdisplay.png)

 

For this guide, I am going to show you how to display the most recent update from the [BroTips](http://brotipshq.com) Twitter feed. First up, if you haven't already, [install Geektool](http://projects.tynsoe.org/en/geektool/). All done? Good. Now you need to download [this RSS geeklet](http://www.macosxtips.co.uk/geeklets/internet/display-recent-items-from-any-rss-feed/), open it and select 'yes'. This will run the script needed to display and RSS feed.

![RSS Geeklet Run](http://therobb.com/wp-content/uploads/2011-04-rssgeeklet.png)[ ](http://therobb.com/wp-content/uploads/2011-04-rssgeeklet.png)

Now you need to get the Twitter ID of the user that you want to display. Jump over to [ID From User](http://www.idfromuser.com/) and input the Twitter username of the person whose tweets you want to display. Make a note of the ID. Next up is editing the geeklet script. Open up Geektool from preferences and select the RSS box which, at this stage, will be blank.

![Geekletselect 2](http://therobb.com/wp-content/uploads/2011-04-geekletselect-2.png)

Select the 'Command:' box from the properties window and delete the URL that is on the first line. Now replace it with _http://twitter.com/statuses/user_timeline/12345678.rss_, where 12345678 is the ID that you got earlier. Next, to specify the number of items shown, in this case, one, use your arrow keys to go down to the line that says _end="9"_. Change _9_ to _1_, which will now only display the most recent tweet. If you want to show more than one update, simply change the _1_ to something else.

Press enter, and your new script should now show the latest update from your chosen user, in my case, BroTips. This can be used to show _any_ RSS feed and is not limited to Twitter updates. The finished product:

![Bro Tips #175](http://therobb.com/wp-content/uploads/2011-04-brotipsdisplay.png)

**Update:** As pointed out in the comments, this method may be a difficult for some, so here is the code you need to paste into the command box when creating a new 'shell' in GeekTool, not forgetting to replace _12345678_ with the ID from earlier:

_ _

_

URL="http://twitter.com/statuses/user_timeline/12345678.rss"

maxLength="500"

start="3"

end="1"

curl --silent "$URL" |sed -e :a -e '$!N;s/n//;ta' |sed -e 's/<title>/<title>/g' |sed -e 's/</title>/</title>/g' |sed -e 's/<description>/<description>/g' |sed -e 's/</description>/</description>/g' |grep -E '(title>|description>)' |sed -n "$start,$"'p' |sed -e 's/<title>//' |sed -e 's/</title>//' |sed -e 's/<description>/   /' |sed -e 's/</description>//' |sed -e 's/<![CDATA[//g' |sed -e 's/]]>//g' |sed -e 's/&lt;/</g' |sed -e 's/&gt;/>/g' |sed -e 's/<[^>]*>//g' |cut -c 1-$maxLength |head -$end |sed G |fmt

_