---
title: Get Custom Screensavers on the Kindle 4 on OS X
permalink: /get-custom-screensavers-on-the-kindle-4-mac-osx/
date: 2012-03-21 01:17:56
layout: post
---

This guide is for getting custom screensavers onto the new Kindle (Non-Touch) using Mac OSX.

The first thing you need to do is plug your Kindle into your Mac via USB. Then create a file with the name `ENABLE_DIAGS` and make sure it has _no extension_ (e.g. .txt, .jpg). Copy this file to the root of your Kindle and then eject. Now go into settings and restart your Kindle and it should enter diagnostics mode. 

Once your in the diagnostics mode, go to `Misc individual diagnostics > Utilities > Enable USBnet` and press the right arrow to confirm. You are now ready to create the folder you'll need to add custom screensavers.  Connect your Kindle to your Mac and open up network preferences. 

On the left hand side you should see `RNDIS/…Gadget` in the connections list. Select this and then change `Configure Ipv4` to "manually". Change the IP address to `192.168.15.1`. Now open up the Terminal (Applications > Terminal). From the terminal you will need to enter each of these commands one by one either by typing them out, or copying and pasting each one. I would suggest using [this pastebin dump](http://pastebin.com/17czdUS7) to copy from to avoid any weird issues. The root password is `mario`, enter this when prompted (after the first command).

The commands you need to enter are as follows:

`ssh root@192.168.15.1`

`enter password if/when prompted`

`mntroot rw mkdir /mnt/us/screensaver mount /dev/mmcblk0p1 /mnt/base-mmc mv /mnt/base-mmc/opt/amazon/screen_saver/600x800 /mnt/base-mmc/opt/amazon/screen_saver/600x800.old ln -sfn /mnt/us/screensaver /mnt/base-mmc/opt/amazon/screen_saver/600x800`

Now you can disconnect your Kindle and exit the diagnostics mode. To do this, simply press the right arrow to exit each menu until you see `Exit, Reboot or Disable Diags`. Select this and then choose `Disable diags` and confirm with the left arrow and your Kindle should reboot. Once your Kindle has rebooted, connect it back up to your Mac and open it in Finder. There should be a new folder called "Screensavers". Simply put your custom screensavers in that folder and restart your Kindle. And voila, custom screensavers! 

If you need screensavers, I found most of the ones I'm using from [here](http://kindlewallpapers.tumblr.com/). If you want to create your own, screensavers must be in .jpg or .png format and have dimensions of 600 x 800. Have fun!