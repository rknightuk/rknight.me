---
title: ChatCGT and mySQL Database Schemas
permalink: /chatcgt-and-mysql-database-schemas/index.html
date: 2022-12-16T19:38:40.307Z
excerpt: ""
layout: post
---

[ChatCGT](https://chat.openai.com/chat) is wild. I entered "_Describe a mysql database schema for tracking the owned books of multiple people_" and it came back with the queries to write the tables including foreign keys:

```sql
CREATE TABLE people (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL
);

CREATE TABLE owned_books (
  person_id INTEGER NOT NULL,
  book_id INTEGER NOT NULL,
  PRIMARY KEY (person_id, book_id),
  FOREIGN KEY (person_id) REFERENCES people(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);
```

I do things like this regularly so I _can_ do this no problem but having a rough draft dumped in front of me within seconds is handy. It even gives examples of what queries you could run with the data, so I followed up with "_What would the query for how many books each person owns look like?_"


```sql
SELECT p.name, COUNT(ob.book_id) AS num_books
FROM people p
JOIN owned_books ob ON p.id = ob.person_id
GROUP BY p.id
```

I'm not convinced I'm getting replaced _yet_ but I'm a tiny bit more worried than I was a few weeks ago.
