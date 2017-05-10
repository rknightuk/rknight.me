---
title: "Quick Tip: Delete Unused Tags in Wordpress"
permalink: /quick-tip-delete-unused-tags-in-wordpress/
date: 2011-04-11 09:00:00
layout: post
---

When using a custom install version of Wordpress, you may, at some point, have occasion to delete all your unused tags (for archiving reasons, deleted posts, etc). To do this is very simple, and only involves using this command in phpMyAdmin:

DELETE FROM wp_terms WHERE term_id IN (SELECT term_id FROM wp_term_taxonomy WHERE count = 0 );

This will delete any tags that are currently not being used in Wordpres and just clean everything up a bit. Simple as that.

via [Wordpress Support Forums](http://wordpress.org/support/topic/delete-unused-tags-in-bulk)