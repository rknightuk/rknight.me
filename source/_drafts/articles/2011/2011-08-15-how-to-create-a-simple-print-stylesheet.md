---
title: How to Create a Simple Print Stylesheet
permalink: /how-to-create-a-simple-print-stylesheet/
date: 2011-08-15 11:00:24
layout: post
---

Print stylesheets are immensely useful for all types of web pages and in my opinion, should be included in _every single web site_. It doesn't matter if you think your visitors won't want to print, take the five minutes to create one (or get your web developer to do it). Here's a quick guide on creating a simple print stylesheet for your website.

There are two basic parts to a print stylesheet: 

  * Remove unwanted elements: navigation, adverts, social links
  * Make the text readable when printed
To create your stylesheet, create a new document called _style.css_. Now you need to hide your unwanted elements by using _display:none_:  #header, #footer, #navigation, #social { display: none; }  Your stylesheet will need to be edited to include whichever div elements you need to hide, in this case _#header, #footer, #navigation_ and _#social_ are hidden when printing. Now that these elements are hidden you need to make your text readable when it's printed. This is done exactly like a normal stylesheet:  body, p { color: #000; background-color: #fff; font-style: "Times New Roman"; font-size: 12pt; } a:link, a:visited { color: #781351 }  This makes the text black, the background white and any links blue. You can also change the size and font of your text (12pt is a good size for printing but 14pt would also be acceptable). Time New Roman is an easy font for reading printed material. By now your stylesheet should look something like this:  #header, #footer, #navigation, #social { display: none; } body, p { color: #000; background-color: #fff; font-style: "Times New Roman"; font-size: 12pt; } a:link, a:visited { color: #781351 }  The final thing you need to do is tell the browser to use this stylesheet when printing. Go into the header of your site and use this code to link to the stylesheet:  The key is to use the _media="print"_ part to let the browser know this is only for printing. So now you know how to create one, there's no excuse. Get on it so your visitors can print out something that doesn't look like the internet threw up in your printer.
