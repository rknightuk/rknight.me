---
title: "KnightPrint's First Run"
permalink: /blog/knightprints-first-run/index.html
date: 2025-07-25T20:28:40.430Z
excerpt: "An overview of how letting my thermal printer loose on the internet went"
tags:
    - Development
    - Mastodon
    - OpenWeb
---

Last week my wife and I bought what is commonly known as a Cat Printer: it's a very cheap (< £10) thermal printer that has a cat face on it. The official way of using it is with one of many terrible apps - each company who sells these tweaks the models a bit and has their own app but I was interested to see that some folks have reversed engineered the printers to print from various places including my favourite, the web. And I knew exactly what I wanted to do with it: let people toot me and it get printed.

![The UI of KnightPrint showing buttons and a toot on the left, and a logging panel showing info about the printer on the right](https://cdn.rknight.me/site/2025/knightprint-ui-demo.jpg)

I have what I think is a newer model, an MXW01. This meant that it wouldn't work with a majority of the libraries as they all support the same set of models. I thought I was out of luck until I punched in the model number into GitHub search and found [this project](https://catprinter.vercel.app). This person not only worked out the Bluetooth protocol for the model, but setup an image and receipt printer web page. This is what I based the KnightPrint code on.

> [!NOTE] Note
> The code for this isn't on GitHub right now. It has API keys and all sorts in it. As soon as I've cleaned it up, I'll link it here. If you're reading this note, it's still not available.

I hacked away at the cat printer code until I had it rendering abritrary text and an image, and making a request to an endpoint on an interval.

Once I had that working I setup an account, [@knightprint@hub.7622.me](https://hub.7622.me/@knightprint), on my GoToSocial instance, grabbed the API key, and setup this very quick endpoint to fetch new mentions, download the images to a tmp directory, and also have a way to save the IDs of toots I've already printed.

```php
<?php

$method = $_GET['type'] ?? 'mentions';

$curl = curl_init();

header("Content-Type: application/json");

if ($method === 'mentions') {
  curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://hub.7622.me/api/v1/notifications?types[]=mention',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => array(
      'Authorization: Bearer lolnope'
    ),
    CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  ));

  $response = curl_exec($curl);

  curl_close($curl);

  $data = json_decode($response);

  $ids = json_decode(file_get_contents('ids.json'));

  $data = array_filter(array_map(function($mention) use ($ids) {
      $printed = in_array($mention->id, $ids);
      if ($printed) {
          return null; // Skip already printed mentions
      }

      $attachment = $mention->status->media_attachments[0] ?? null;
      $attachmentPath = null;
      if ($attachment && $attachment->type === 'image') {
          $url = $attachment->preview_url;
          $attachmentPath = './tmp/' . basename($url);
          if (!file_exists($attachmentPath)) {
            ini_set('user_agent', 'KnightPrint');
            file_put_contents($attachmentPath, file_get_contents($url));
          }
      }
      return [
          'id' => $mention->id,
          'name' => $mention->account->display_name ?? $mention->account->username,
          'account' => $mention->account->acct,
          'content' => strip_tags(str_replace('</p><p>', "\n\n", $mention->status->content)),
          'image' => $attachmentPath ? [
            'url' => $attachmentPath,
            'width' => $attachment->meta->small->width ?? null,
            'height' => $attachment->meta->small->height ?? null,
          ] : null,
      ];
  }, $data));

  echo json_encode($data);
} else if ($method === 'printed') {
  $ids = json_decode(file_get_contents('ids.json'));
  $newIds = explode(',', $_GET['ids']);

  $ids = array_merge($ids, $newIds);

  file_put_contents('ids.json', json_encode($ids));

  echo json_encode([
      'status' => 'success',
      'message' => 'ID added successfully',
      'ids' => $ids
  ]);
}
```

The front end then hits this endpoint, checks for new toots, renders them to a canvas, and prints them. Once they're printed, it sends the IDs to the API endpoint which then saves them to a JSON file so I don't print the same ones twice.

Then I [set it loose](https://social.lol/@robb/114915356355934723):

> Let's try this. In theory, anything you send to @knightprint for the next 20 minutes (or until I turn it off), will just print out on my lil thermal printer.

The first handful came it and it all worked perfectly but I noticed that I hadn't put the person's username on the printout so I edited the endpoint while it was listening for new toots:

```diff
- 'content' => strip_tags(str_replace('</p><p>', "\n\n", $mention->status->content)),
+ 'content' => strip_tags(str_replace('</p><p>', "\n\n", $mention->status->content)) . "\n\n - @" . $mention->account->acct,
```

I turned it off after about 20 minutes to see what had been printed and was presented with, for the first time in my life, a list _literally_  longer than my arm. Then I turned it on again because it's fun. 

![Two photos of a thermal printer being held up to a wall with a lot of toots printed out](https://cdn.rknight.me/site/2025/knightprint-first-runs.jpg)

I'll turn it on again at random and I have some other ideas I could pull off with this as well.