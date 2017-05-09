---
title: Automatically Rename TV Shows with Hazel and TVNamer
permalink: /automatically-rename-tv-shows-with-hazel-and-tvnamer
date: 2013-08-08 13:14:20
layout: post
---

I download a lot of TV shows (all legal of course) and have been renaming the files using [TVRenamer](https://github.com/tvrenamer/tvrenamer). After using TVRenamer manually for months I got fed up with having to do it, or the much more likely scenario happened where I would just leave them to build up in my downloads folder. I recently started using [Hazel](http://www.noodlesoft.com/hazel.php) to automatically rename and organise my photos. This works well because Hazel simply changes the filename to the date they were taken. TV shows are a little more complex than that as they have season and episode numbers as well as titles. Enter [TVNamer](https://github.com/dbr/tvnamer).

TVNamer is a command line utility that takes a TV episode with an ugly filename (show.name.3x20.720[HD].avi) and changes it to something much more readable (ShowName S03E20 - Episode Title.avi). To install TVNamer follow the simple instructions in the [readme](https://github.com/dbr/tvnamer/blob/master/readme.md), it only takes a couple of minutes. Once it’s installed to can use it by simple typing:
    
    
    
    tvnamer <filename>
    
    

TVNamer will then parse the file, look for episode information and, if it finds more than one result, will prompt you to choose the correct one and confirm the rename. When I tested this the correct result was always the first one which makes using Hazel to automate the process much easier. 

If you’re not familiar with Hazel, it’s a preference pane for Mac that monitors folders and matches files based on rules much like iTunes smart playlists. You can then set actions to perform when your rules are matched such as move files, rename them or run shell scripts.

To setup automatic renaming, open Hazel, select the folder where your TV shows download to, then add a new rule. Obviously rules will entirely depend on the type of files you choose to download but personally I set Hazel to find any files that have the extension _mkv_, _avi_ or _mp4_. Then choose to run a shell script on the matched files and choose _“embedded script”_.

![Hazel Screenshot](http://rmlewisuk.s3.amazonaws.com/automatically-rename-tv-shows-with-hazel-and-tvnamer-sshot.png)

Select edit script and paste in the following:
    
    /usr/local/bin/tvnamer --batch "$1"
    

The _–batch_ option tells TVNamer to automatically choose the first result and rename it and the _$1_ refers to the matched file Hazel found. To test your rule is working select the cog dropdown in the main Hazel screen and select _"Run rules now"_. Any files that match your Hazel rule should be renamed. 

Initially I found that Hazel can sometimes have issues with running TVNamer if you’re matching files within subdirectories of your downloads folder. To remedy this I have Hazel move matched files to another folder and rename them from there. Refer to [this Tuts+ guide](http://mac.tutsplus.com/tutorials/app-training/9-hazel-rules-to-increase-your-productivity/) to find out how to use Hazel to move files automatically.

