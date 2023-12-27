---
title: Convert LXF to Bricklink XML
permalink: /blog/convert-lxf-to-bricklink-xml/index.html
layout: post
excerpt: "How to use Rebrickable to convert an LXF file to Bricklink XML format to upload to a wanted list."
date: 2016-03-22T00:00:00.000Z
tags:
    - Lego
---

When you've created a model in Lego Digital Designer, you likely want get those parts into a Bricklink wanted list so you can order them. Unfortunately, LDD doesn't have an option to export to the required [Bricklink XML format](http://www.bricklink.com/help.asp?helpID=207). Thankfully, [Rebrickable](http://rebrickable.com) has the ability to convert an LDD model to Bricklink XML. You'll need a Rebrickable account to do this, so if you haven't got one yet, [register for one](http://rebrickable.com/signup), and sign in.

Once you're signed in, choose "My Private MOCs" from the account dropdown menu and click "Add New Private MOC", give it a name, and then press "Save Details". Below this you will see a number of import options, but for the purposes of this article, we'll be focusing only on the LXF import. Click " Import from MPD/LDR/LXF file", choose your LXF file from your computer, and press "import". 

![](http://studshq.s3.amazonaws.com/rebrickable-import.jpg)

Rebrickable will then show all the parts from the model and indicate if any colours you've used don't exist. To fix any errornous colours, click on the part and choose a valid colour from the dropdown, and hit "Save". This is also a good time to change the colour of any parts that Rebrickable marks as "rare" — you may want to switch to a more common colour to make it easier to buy.

Once you're happy with your part list, click "Add to your Bricklink Wanted List". A window will popup allowing you to login to Bricklink. You can choose to add them to an existing list, or create a new one from this window. Once you click "Add parts", a message will confirm that the parts have been added, and there will be a button to view your wanted list.

![](http://studshq.s3.amazonaws.com/rebrickable-add-to-list.jpg)

***

**Update: When this post was written, I didn't realise Rebrickable had a feature to automatically add parts to a Bricklink wanted list.**

<s>Once you're happy with your part list, click "Export to Bricklink (XML)" and your parts list will be downloaded in the correct format to import into Bricklink.

If you want to upload the parts list to a specific wanted list on Bricklink, you will need to edit the XML file in a text editor (I recommend [Sublime Text](https://www.sublimetext.com/)). You'll need to add `<WANTEDLISTID>12345</WANTEDLISTID>` to every part in the XML file, where `12345` refers to your Bricklink wanted list ID.

Once all that is done, you can [upload it to Bricklink](http://www.bricklink.com/wantedXML.asp).</s>