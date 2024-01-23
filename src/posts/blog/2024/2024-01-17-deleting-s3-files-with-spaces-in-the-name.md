---
title: "Deleting S3 Files with Spaces in the Name"
permalink: /blog/deleting-s3-files-with-spaces-in-the-name/index.html
date: 2024-01-17T15:26:31.637Z
excerpt: "An issue I came across at work deleting files that had spaces in the filename"
layout: post
tags:
    - Development
---

This is a fun one: I had a file, lets say it was originally called `mycoolfile (2).png`, it's been uploaded to S3, and then stored in our database. Except at some point it's become URL encoded so it looks like this instead: `mycoolfile%20%282%29.png`. Now I want to delete that file using the [AWS SDK for PHP](https://aws.amazon.com/sdk-for-php/) which you can do, in theory, like so:

```php
$this->s3->deleteObjects([
    'Bucket' => 'coolbucket',
    'Delete' => [
    'Objects' => [
        [
            'key' => 'mycoolfile%20%282%29.png',
        ]
    ],
]);
```

Except, no. AWS will _not_ find that file, won't delete it, and won't give you an error message[^1]. Add a `urldecode` and it deletes the file with no issues.

```diff
$this->s3->deleteObjects([
    'Bucket' => 'coolbucket',
    'Delete' => [
    'Objects' => [
        [
-            'key' => 'mycoolfile%20%282%29.png',
+            'key' => \urldecode('mycoolfile%20%282%29.png'),
        ]
    ],
]);
```

I guess I should have checked this sooner but I was looking for the bug in completely the wrong place so this took longer to find than expected. This blog post is definitely going to save me pain again in the future.

[^1]: This might be a limitation of the PHP SDK rather than the API in general
