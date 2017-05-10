---
title: How to Load Python 3.2 Modules on OSX
permalink: /how-to-load-python-3-2-modules-on-osx/
date: 2011-10-23 00:48:10
layout: post
---

I've recently started learning Python at university and the third lecture was about using John Zelle's [graphics module](http://mcsp.wartburg.edu/zelle/python/), which has to be imported into Python to use it. The instructions we were given for installing were only for Windows, which involved copying the file to _C:nPython32nLibnsite-packages_. On a Mac, no such folder exists so I had to look for the answer.After many hours of searching, trial and error and getting very frustrated, the solution was simple. The _graphics.py_ file needs to be placed in the same folder as the Python module you're working on. A simple solution to what seemed like a never-ending problem. Done.