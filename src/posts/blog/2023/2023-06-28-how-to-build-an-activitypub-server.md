---
title: Building an ActivityPub Server
permalink: /blog/building-an-activitypub-server/index.html
date: 2023-06-28T05:48:41.588Z
excerpt: "I built Bugle, an ActivityPub server with Laravel and PHP. These are my notes on how it all works to the best of my understanding"
layout: post
tags:
  - ActivityPub
  - Development
  - OpenWeb
project: https://bugle.lol
---

To start with, I'm not convinced everything I've done here is exactly to the ActivityPub specification or if there will be problems interacting with Bugle on various ActivityPub servers outside the main ones (Mastodon, Calckey, etc). I'm also unclear on which parts of this are Mastodon-specific and which parts are pure ActivityPub. I will use Mastodon as the example external server throughout.

I won't go over setting up my database or server for this but at minimum you'll need a way to handle requests, render JSON, and a database to store posts and activities.

### WebFinger and Profile JSON

This is the easiest part of the whole thing, two JSON files: `.well-known/webfinger` and `@bugle.json`.

`.well-known/webfinger` is how ActivityPub finds links to your profile. Searching for `@bugle@bugle.lol` on Mastodon, for example, will send a `GET` request to `https://bugle.lol/.well-known/webfinger?resource=acct:bugle@bugle.lol` which will return the following:

```json
{

  "subject": "acct:bugle@bugle.lol",
  "links": [
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://bugle.lol/@bugle"
    }
  ]
}
```

The server handles checking if the requested `resource` exists and returning the correct data. The `links` part is how it knows the account lives at `bugle.lol/@bugle`. This might seems obvious but it isn't always the case that the username match the domain where the profile lives. For example, the profile for [viticci@macstories.net](https://mastodon.macstories.net/@viticci) is actually at `mastodon.macstories.net/@viticci`, which is indicated by the webfinger.

Once Mastodon has the link, it will make a request to that link (in this case `https://bugle.lol/@bugle`) for the profile json file which includes general profile information like name, avatar, and bio, as well as which endpoints it should send requests to. These are usually called an inbox although the actually name and path isn't important. 

You can see a full example on [my Mastodon profile](https://social.lol/@robb.json) but I'll go through the main important parts here. The first part is the `@context`, which as best I can tell it an indicator of the type of object(?) we're defining, in this case an activity stream.

```json

{
	"@context": [
	    "https://www.w3.org/ns/activitystreams",
	    "https://w3id.org/security/v1",
	]
}
```

The next part is an ID to identify your user, a type to define that this is a `Person`, and endpoints for various features, some of which are Mastodon-specific (like `featured` and `featuredTags`).

```json
{
	"id": "https://bugle.lol/@bugle",
	"type": "Person",
	"following": "https://bugle.lol/@bugle/following",
	"followers": "https://bugle.lol/@bugle/followers",
	"inbox": "https://bugle.lol/@bugle/inbox",
	"outbox": "https://bugle.lol/@bugle/outbox",
	"featured": "https://bugle.lol/@bugle/collections/featured",
	"featuredTags": "https://bugle.lol/@bugle/collections/tags",
	"endpoints": {
	    "sharedInbox": "https://bugle.lol/inbox"
	},
}
```

I'm not entirely sure when most of these are used aside from when first searching for a profile (because I see the requests in the logs) but the important ones here are `inbox` and `endpoints.sharedInbox`. This is where replies and mentions will get posted to (`sharedInbox`) and activities such as likes, follows, and boosts (`inbox`). I'll go into how that works further down.

We also need information about the profile itself like name, bio, profile picture, and so on. The `icon` attributes refer to your main profile image and `image` refers to a header image.

```json
{
	"name": "bugle dot lol",
	"summary": "<p>A bio goes here</p>\n",
	"url": "https://bugle.lol/@bugle",
	"manuallyApprovesFollowers": false,
	"discoverable": true,
	"published": "2022-12-16T00:00:00Z",
	"icon": {
		"type": "Image",
		"mediaType": "image/jpeg",
		"url": "http://placekitten.com/200/300"
	},
	"image": {
		"type": "Image",
		"mediaType": "image/jpeg",
		"url": "http://placekitten.com/600/300"
	}
}
```

Finally we need a `publicKey` attribute. This is used to validate requests to and from the server:

```json
"publicKey": {
		"id": "https://bugle.lol/@bugle#main-key",
		"owner": "https://bugle.lol/@bugle",
		"publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyB9YyNt5OB23VW3sFm5o\nPnV4phqSXgqwyqmjXIE6ZtwLE0I6JEeeqv+SD2pd9QDXiUfugEWuUyNImZCglNg2\nV3Vh/NNr/YX6tWW6VSkudJ/b8lNQF8Rr/Z9wK9jD0WUmFs+YjS0R/KePDtLt1HOX\nVfjPLyOCODO+ykXQkydLI1RZf3V+iJdiTP9e5nhBxQGHkbyVja/86uqJIC96zyX4\nQPteEtHjXngVgO6QozCQu6Null4WFOHUdPGHaN7wsJtkZV10BPp3yCOiirJQlXSp\no+7YfJuROFv8QU+jWitTPTYWQYEuRwUfDUsdThqSh/u6eZt2hHjTzcI0/qgpxWqI\n1wIDAQAB\n-----END PUBLIC KEY-----\n"
	},
```

You can generate these in most languages. Here's how I did it in PHP on profile creation to store in the database:

```php
$config = [
	"private_key_bits" => 2048,
	"private_key_type" => OPENSSL_KEYTYPE_RSA,
];

$keypair = openssl_pkey_new($config);
openssl_pkey_export($keypair, $private_key);

$public_key = openssl_pkey_get_details($keypair);
$public_key = $public_key["key"];
```

### Receiving Activities

As mentioned above there are two endpoints for receiving activities: The global inbox (`/inbox`) and the user inbox (`/@bugle/inbox`). 

### Validating Requests

All signature validation is handled in my [`HttpSignature` class](https://github.com/rknightuk/bugle/blob/main/app/Services/HttpSignature.php) if you'd prefer to look at the code directly.

Every request that comes in should be validated against the signature to make sure it's a valid request. The first step is to extract the values into an array keyed by the name (other languages and frameworks might have an easier way to do this).

```php
$values = [];

// split the signature at ',' and assign each one
// to $values, keyed by its name
$parts = explode(',', $request->header('signature'));
foreach ($parts as $current) {
	$pair = explode('=', $current, 2);
	$key = $pair[0];
	$value = substr($pair[1], 1, -1);
	$values[$key] = $value;
}

// $values is now:
// [
//    'keyId' => 'https://mas.to/users/rknightuk#main-key',
//    'algorithm' => 'rsa-sha256',
//    'headers' => ''(request-target) host date digest content-type',
//    'signature' => 'BIGLONGSIGNATURE',
// ];
```

Next we need to get the `headers` value from the signature, and map over those, get the values from the request headers, and generate a string. This string is what we use to validate the request:

```php
$inboxPath = '/@bugle/inbox';

$headerList = explode(' ', $values['headers']);
// $headersList = [
//	'(request-target)',
//	'host',
//	'date',
//	'digest',
//	'content-type',
// ]

$expectedHeaders = [];
  
foreach ($headerList as $h) {
	if ($h === "(request-target)") {
		$expectedHeaders[] = "(request-target): post " . $inboxPath;
	} else {
		$expectedHeaders[] = $h . ": " . $request->headers->get($h);
	}
}

$signatureHeader = $request->header('signature');
$signaturePairs = explode(',', $signatureHeader);
$signatureHeaderMap = [];

foreach ($signaturePairs as $pair) {
	$pairParts = explode('=', $pair);
	$key = trim($pairParts[0]);
	$value = trim($pairParts[1], '"');
	$signatureHeaderMap[$key] = $value;
}

$str = implode("\n", $expectedHeaders);

// $str:
// "(request-target): post /@bugle/inbox
// host: 9928-82-19-65-174.ngrok-free.app
// date: Tue, 27 Jun 2023 15:27:11 GMT
// digest: SHA-256=LdxwDtVsenhzJE0E3H2oj2C7cKPvZYEG5LrY0phH9Zc=
// content-type: application/activity+json"
```

One thing to note here is if you set different inbox URLs for user and for local, then you need to specific which path you're validating for (either `/inbox` or `/@bugle/inbox`) otherwise the signatures won't match.

Lastly, we need to fetch the public key for the actor, and use that to validate the request:

```php
$keyId = $signatureHeaderMap['keyId'];
$actor = Http::accept('application/activity+json')->get($keyId);
$publicKeyPem = $actor['publicKey']['publicKeyPem'];
$verifier = openssl_get_publickey($publicKeyPem);
$validate = openssl_verify($str, base64_decode($signatureHeaderMap['signature']), $verifier, OPENSSL_ALGO_SHA256);

$isValid = $validate === 1;
```

If `isValid` is true, we can carry on and accept requests. You should do this for all requests that come into the inboxes.

### Likes, Boosts, and Follows

The user inbox will `POST` requests for follows, likes, and boosts. Likes and boosts are easy enough to handle as you don't need to respond to the request or even store them if you don't want to. A like is the simplest of the two. It contains an ID of the like, the type of activity, the actor, and the object - this is the post that has been liked.

```json
{
	"@context": "https://www.w3.org/ns/activitystreams",
	"id": "https://aninstance.social/users/robb#likes/10253875",
	"type": "Like",
	"actor": "https://aninstance.social/users/robb",
	"object": "https://bugle.lol/@bugle/f6dfebf6-1a73-4b3e-8afa-28a768698579",
}
```

Boosts are similar, but they also include `to` and `cc` arrays of users the post is being boosted to, as well as a `published_at` date.

```json
{
	"@context": "https://www.w3.org/ns/activitystreams",
	"id": "https://aninstance.social/users/robb/statuses/110592144954280515/activity",
	"type": "Announce",
	"actor": "https://aninstance.social/users/robb",
	"published": "2023-06-23T06:36:51Z",
	"to": [
		"https://www.w3.org/ns/activitystreams#Public"
	],
	"cc": [
		"https://8d19-82-19-65-174.ngrok-free.app/@bugle",
		"https://aninstance.social/users/robb/followers",
	],
	"object": "https://8d19-82-19-65-174.ngrok-free.app/@bugle/f6dfebf6-1a73-4b3e-8afa-28a768698579",
}
```

Follow events are more complicated because they require a response. A follow activity will look something like this:

```json
{
	"@context": "https://www.w3.org/ns/activitystreams",
	"id": "https://aninstance.social/9bb08aae-c666-432f-a3e6-35617e32830d",
	"type": "Follow",
	"actor": "https://aninstance.social/users/robb",
	"object": "https://bugle.lol/@bugle",
}
```

To respond to a follow, we need to send an `Accept` activity with a valid signature. To start with we need to build our activity message; it has an ID, type, actor (the user being followed) and an `object` which in this case, is the `Follow` activity we received. 

```php
// this isn't important unless you intend to store all
// follow requests that come into the system but a unique(ish)
// ID is required here
$guid = bin2hex(random_bytes(16));

$message = [
	'@context' => 'https://www.w3.org/ns/activitystreams',
	'id' => 'https://bugle.lol' . '/' . $guid,
	'type' => 'Accept',
	'actor' => 'https://bugle.lol/@bugle',
	'object' => [
		'@context' => 'https://www.w3.org/ns/activitystreams',
		'id' => 'https://aninstance.social/9bb08aae-c666-432f-a3e6-35617e32830d',
		'type' => 'Follow',
		'actor' => 'https://aninstance.social/users/robb',
		'object' => 'https://bugle.lol/@bugle',
	],
];
```

To generate the signature we need the message we just created, the private key of the profile from the database, the host of the actor (in this case `aninstance.social`), the inbox path (`/@bugle/inbox`), and the url to the profile.

```php
$host = 'aninstance.social';
$path = '/@bugle/inbox';
$privateKey = 'a_private_key';
$keyId = 'https://bugle.lol/@bugle';

$hash = hash('sha256', json_encode($message), true);
$digest = base64_encode($hash);

$date = date('D, d M Y H:i:s \G\M\T');
$signer = openssl_get_privatekey($privateKey);
$stringToSign = "(request-target): post $path\nhost: $host\ndate: $date\ndigest: SHA-256=$digest";
openssl_sign($stringToSign, $signature, $signer, OPENSSL_ALGO_SHA256);
$signature_b64 = base64_encode($signature);

$header = 'keyId="' . $keyId . '",algorithm="rsa-sha256",headers="(request-target) host date digest",signature="' . $signature_b64 . '"';

$headers = [
    'Host' => $host,
    'Date' => $date,
    'Signature' => $header,
    'Digest' => 'SHA-256=' . $digest,
    'Content-Type' => 'application/activity+json',
    'Accept' => 'application/activity+json',
];
```

Finally, we send the `Accept` activity:

```php
$inbox = 'https://aninstance.social/users/robb/inbox';

return Http::withHeaders($headers)
	->withBody(json_encode($message), 'application/json')
	->post($inbox);
```

We'll need this same header signature generation later for notifying followers of new posts.

If someone unfollows you, you'll receive an `Undo` request. Check the `actor` on that request and you can then remove them from your followers table.

### Replies

The global inbox will receive a `POST` request with data about replies and @mentions with data that looks something like this:

```json
{
	"id": "https://mas.to/users/rknightuk/statuses/110617068531392295/activity",
	"type": "Create",
	"actor": "https://mas.to/users/rknightuk",
	"published": "2023-06-27T16:15:15Z",
	"to": [
	   "https://www.w3.org/ns/activitystreams#Public",
	],
	"cc": [
	    "https://mas.to/users/rknightuk/followers",
	    "https://bugle.lol/@robb",
	],
	"object": {
	    "id": "https://mas.to/users/rknightuk/statuses/110617068531392295",
	    "type": "Note",
	    "inReplyTo": null,
	    "published": "2023-06-27T16:15:15Z",
	    "url": "https://mas.to/@rknightuk/110617068531392295",
	    "attributedTo": "https://mas.to/users/rknightuk",
	    "to": [
	        "0": "https://www.w3.org/ns/activitystreams#Public",
	    ],
	    "cc": [
	        "https://mas.to/users/rknightuk/followers",
	        "https://bugle.lol/@robb",
	    ],
	    "content": "<p><span class=\"h-card\"><a href=\"https://bugle.lol/@robb\" class=\"u-url mention\">@<span>robb</span></a></span> hello!</p>",
	}
}
```

If you only have one profile setup then you're golden: just save the `object.content` and the `object.id` somewhere and you have your reply. If you have a server with multiple profiles, you can map over the `object.cc` array to find matching profiles for your domain.

As a bonus here, unrelated to ActivityPub, I setup [https://ntfy.sh/](https://ntfy.sh/) to send me notifications whenever I get a reply:

```php
$ntfyKey = config('bugle.ntfy_key');

Http::withHeaders([
	'Content-Type' => 'text/plain',
	'Title' => 'New mention from @' . $activity->getActorUsername(),
	'click' => Arr::get($input, 'object.url'),
])
->post('https://ntfy.sh/' . $ntfyKey, strip_tags($activity->content));
```

### Formatting Posts

The post's content needs to be rendered to HTML. Bugle supports writing in Markdown so I use [`league/commonmark`](https://github.com/thephpleague/commonmark) to format the content for sending to followers. I also extract @mentions to generate links in the posts and add them to `tags` on the post JSON. See [`TootFormatter`](https://github.com/rknightuk/bugle/blob/main/app/Services/TootFormatter.php) for the full implementation.

A post that looks like this:

```md
This toot has [a link](https://example.com) and a mention: @robb@social.lol ahoy!
```

Is run through the formatter:

```php
$content = 'This toot has [a link](https://example.com) and a mention: @robb@social.lol ahoy!';

$converter = new CommonMarkConverter([
	'html_input' => 'strip',
	'allow_unsafe_links' => false,
]);

$content = $converter->convert($content)->getContent();

$content = nl2br($content);
$content = str_replace("\n", '', $content);

$tags = [];

$pattern = '/@?\b([A-Z0-9._%+-]+)@([A-Z0-9.-]+\.[A-Z]{2,})\b/mi';
preg_match_all($pattern, $content, $matches);
[$fullUsernames, $usernames, $domains] = $matches;

foreach ($fullUsernames as $i => $fu) {
	$tags[] = [
		'type' => 'Mention',
		'href' => 'https://' . $domains[$i] . '/@' . $usernames[$i],
		'name' => $fu,
	];

	$content = str_replace(
		$fu,
		sprintf(
			'<span class="h-card"><a href="https://%s/@%s" class="u-url mention">@<span>%s</span></a></span>',
			$domains[$i],
			$usernames[$i],
			$usernames[$i]
		),
		$content,
	);
}

$content = preg_replace('/(<br \/>)+$/', '', $content);

return [
	$content, $tags
];
```

Becomes:

```html
<p>This toot has <a href="https://example.com">a link</a> and a mention: <span class="h-card"><a href="https://social.lol/@robb" class="u-url mention">@<span>robb</span></a></span> ahoy!</p>",
```

And the `tags`, which we'll use later to determine who to notify of a mention, look like this:

```json
[
	{
		"type": "Mention",
		"href": "https://social.lol/@robb",
		"name": "@robb@social.lol"
	}
]
```

### Notifying Followers about New Posts

Unlike RSS where new posts can be fetched into a feed ActivityPub requires all followers are notified of new posts by the originating server. Here's an example payload to notify followers of a new post.

```json
{
	"@context": "https://www.w3.org/ns/activitystreams",
	"id": "https://bugle.lol/@bugle/7c01aab9-bc96-4773-b235-703a6d2a1f76",
	"type": "Create",
	"actor": "https://bugle.lol/@bugle",
	"to": [
		"https://www.w3.org/ns/activitystreams#Public"
	],
	"cc": [
		"https://bugle.lol/@bugle/followers",
		"https://example.com/users/robb"
	],
	"object": {
		"id": "https://bugle.lol/@bugle/7c01aab9-bc96-4773-b235-703a6d2a1f76",
		"type": "Note",
		"inReplyTo": null,
		"published": "2023-06-27T20:42:43Z",
		"updated": "2023-06-27T21:30:10Z",
		"attributedTo": "https://bugle.lol/@bugle",
		"content": "<p>Toot toot!</p>",
		"to": [
		  "https://www.w3.org/ns/activitystreams#Public"
		],
		"cc": [
		  "https://bugle.lol/@bugle/followers",
		  "https://example.com/users/robb"
		],
		"senstive": true,
		"summary": null,
		"attachment": [
			{
				"type": "Document",
				"mediaType": "image/jpeg",
				"url": "http://placekitten.com/200/300",
				"name": "A kitten",
				"blurhash": "L46[2Hofofof00j[offQ~qofofof",
				"width": 200,
				"height": 300,
			}
		],
		"tag": [
			{
				"type": "Mention",
				"href": "https://mas.to/@rknightuk",
				"name": "@rknightuk@mas.to"
			}
		]
	}
}
```

The `type` attribute has three possible values that I'm using:

- `Create` - to notify of a new post
- `Delete` - to delete an existing post
- `Update` - to update an existing post after an edit. Mastodon (and I assume others) require the `updated` timestamp for a `Update` activity

The `cc` field is how visibility is controlled on Mastodon (I think) but I haven't looked into it enough so Bugle only has the ability to send public posts.

To notify followers of a new post, send a `POST` request to the _global_ of the followers instance. For the sake of simplicity I'm taking the users domain and appending `/inbox` to it. This won't work in a few edge-cases (like the MacStories example above) so I need to update Bugle to fetch the users endpoints using webfinger either when they follow an account, or each time I need to send to them.

If we assume I have one follower (@robb@example.com) and I make a post that mentioned another account (@dave@example.com) I need to make two requests to notify them both. A follower notification goes to the user inbox:

```php
$follower = 'https://example.com/@robb';
$inbox = 'https://example.com/@robb/inbox';

$headers = ''; // generate header signture as we did above for `Accept`  
$response = Http::withHeaders($headers)
	->withBody(json_encode($message), 'application/json')
	->post($inbox);

```

And an @mention goes to the global inbox. For mentions, you need to include the `tag` array in the post data (see above).

```php
$mention = 'https://example.com/@dave';
$inbox = 'https://example.com/inbox';

$headers = ''; // generate header signture as we did above for `Accept`  
$response = Http::withHeaders($headers)
	->withBody(json_encode($message), 'application/json')
	->post($inbox);
```

### Replying to a post

If you look at the post data above you may have noticed a null value of `inReplyTo`. This is the part that needs to be filled in to reply to a specific post. Say I was replying to [this _excellent_ post](https://social.lol/@robb/109863669770547458) by a handsome internet person I need to include the URL as the value for `inReplyTo` like so:

```php
"inReplyTo": 'https://social.lol/@robb/109863669770547458',
```

Any posts with that set will show up as replies to the original post. 

### A note on attachments

nb: I've only tested images because it's unlikely I'll need video any time soon. 

Attachments are included as an array in the post JSON with their mime type, url, alt text, width/height, and something I hadn't heard of before: a [blurhash](https://blurha.sh/).

```json

{
	"type": "Document",
	"mediaType": "imag/jpeg",
	"url": "http://placekitten.com/200/300",
	"name": "A kitten",
	"blurhash": "L46[2Hofofof00j[offQ~qofofof",
	"width": 200,
	"height": 300,
}
```

A blurhash is "_a compact representation of a placeholder for an image._". So when you see blurry images loading on Mastodon, these are blurhashes. To make one you need a library for your chosen language which in my case was PHP and I used [`bepsvpt/blurhash`](https://github.com/bepsvpt/blurhash):

```php
$hash = $this->blurhash->encode($attachment);

// L46[2Hofofof00j[offQ~qofofof
```

And there you go. Everything I (think) I understand about ActivityPub. All of the code for Bugle is [on GitHub](https://github.com/rknightuk/bugle) for your perusal. 

### Links and Resources

Thanks to [Lewis](https://lewisdale.dev) for his help with verify requests. Articles and implementations I found helpful to work out how all this works:

#### Articles

- [Mastodon instance with 6 files - Justin Garrison](https://justingarrison.com/blog/2022-12-06-mastodon-files-instance/)
- [Playing with ActivityPub - macwright.com](https://macwright.com/2022/12/09/activitypub.html)
- [How to make friends and verify requests - Mastodon Blog](https://blog.joinmastodon.org/2018/07/how-to-make-friends-and-verify-requests/)
- [Decentralizing Social Interactions with ActivityPub - Mozilla Hacks - the Web developer blog](https://hacks.mozilla.org/2018/11/decentralizing-social-interactions-with-activitypub/)
- [You can be friends with my blog | LewisDale.dev](https://lewisdale.dev/post/you-can-be-friends-with-my-blog/)
- [Turning the Joomla website into an ActivityPub server and being an independent participant in the Fediverse - A start - The Joomla Community Magazine](https://magazine.joomla.org/all-issues/february-2023/turning-the-joomla-website-into-an-activitypub-server)
- [ActivityPub.Academy - Sebastian Jambor's blog](https://seb.jambor.dev/posts/activitypub-academy/)
- [Understanding ActivityPub - Sebastian Jambor's blog](https://seb.jambor.dev/posts/understanding-activitypub/)
- [reading-activitypub](https://tinysubversions.com/notes/reading-activitypub/)
  
#### Implementations

- [dariusk/express-activitypub: A very simple reference implementation of an ActivityPub server using Express.js](https://github.com/dariusk/express-activitypub)
- [ActivityPub – WordPress plugin | WordPress.org](https://wordpress.org/plugins/activitypub/)
- [LewisDaleUK/slap: Super Lightweight Activity Pub](https://github.com/LewisDaleUK/slap)
- [A (tiny, incomplete, single user, write-only) ActivityPub server in PHP – Terence Eden’s Blog](https://shkspr.mobi/blog/2024/02/a-tiny-incomplete-single-user-write-only-activitypub-server-in-php/)