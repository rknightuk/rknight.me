---
title: Create a Table in Markdown with No Headers
permalink: /create-a-blank-no-header-markdown-table/index.html
layout: post
excerpt: "Markdown doesn't allow you to create tables without a header by default. This little hack allows you to do that."
date: 2013-11-12
tags:
    - Development
---

Whilst creating a document which requires me to put some data (which isn't in the slightest way tabular data) into a table, I wanted to create the table with no headers. However the way markdown works mean it requires you to set a header for it to create a table in the first place. By using the HTML non-breaking space entity it can be done:

```markdown
&nbsp; | &nbsp;
------ | -----
Stuff  | More things
```

Simple.
