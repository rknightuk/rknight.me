---
title: Fixing Overflow with Inline Lists
permalink: /fixing-overflow-with-inline-lists/
date: 2012-10-02 16:35:59
layout: post
---

Whilst creating a new site yesterday and working with inline lists, this code resulted in the menu items overlapping. 
    
    
    nav li	{
    		list-style-type: none;
    		display: inline;
    		padding: 5px 20px 5px 20px;
    		background: #FFAEF9;
    	}
    

After messing around with pretty much everything I worked out the solution is as simple as setting a margin for the list items and setting display to inline-block: 
    
    
    nav li	{
    		list-style-type: none;
    		display: inline-block;
    		margin: 3px 0;
    		padding: 5px 20px 5px 20px;
    		background: #FFAEF9;
    	}
    

And this fixes the overflow issues of overlapping. Hopefully this will come in useful to at least one other person.