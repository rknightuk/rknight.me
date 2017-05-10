---
title: "Guide: How to Manually Upgrade Your Wordpress Install"
permalink: /guide-how-to-manually-upgrade-your-wordpress-install/
date: 2011-04-12 08:00:21
layout: post
---

If, like me, you've had problems automatically upgrading your Wordpress install, then you'll probably want to upgrade manually. This is relatively simple and can be done in just a few minutes.  The first thing to do is backup your Wordpress database and content, in case something goes wrong. If you don't know how to do this, have a read though [this page](http://codex.wordpress.org/WordPress_Backups) on the Wordpress Codex help pages. Now log into your Wordpress admin panel and go to the plugins page. All of these should be deactivated before upgrading. Now download the latest version of Wordpress from the [Wordpress home page](http://wordpress.org/). Extract the zip and, using your FTP client or file manager, replace all files and folders **except** _wp-content_. Once this is done, follow the steps at **http://yourblogdomain/wp-admin/upgrade.php**. And that's all there is to it but don't forget to reactivate all your plugins. Extra tip: If an automatic upgrade failed, you may see the message "_An automated WordPress update has failed to complete_" at the top of your admin panel. To remove this, open up your FTP client and delete the file _.maintenance_ from the root of your blog.

