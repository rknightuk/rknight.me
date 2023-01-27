---
title: Get Mastodon Account ID from Username
permalink: /get-mastodon-account-id-from-username/index.html
date: 2023-01-27
excerpt: "The Mastodon API requires the account ID for making API requests"
layout: post
---

Note: Every Mastodon has an RSS feed you can use to get statuses if you don't need the data in JSON format `https://example.social/@foobar.rss`.

If you want to get a user's statuses from Mastodon you can't just look these up with the username. You need, to quote the documentation, "the ID of the Account in the database". To get this, we can use the [lookup endpoint](https://docs.joinmastodon.org/methods/accounts/#lookup) that will return what we need:

```bash
# for an account on example.social
curl https://example.social/api/v1/accounts/lookup?acct=foobar

# also works for remote accounts
curl https://example.social/api/v1/accounts/lookup?acct=foobar@another.social
```

Assuming the username is valid, you will receive a response like this:

```json
{
    "id": "1234567891011121314",
    "acct": "foobar",
    "username": "foobar"
    // ...
}
```

Then you can use that ID to make a request for a users statuses:

```bash
curl https://example.instance/api/v1/accounts/1234567891011121314/statuses
```
