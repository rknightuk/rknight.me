---
title: PHP
eleventyNavigation:
  key: PHP
  parent: Programming
---

## NVM not Working on Deploy on Laravel Forge

Source `nvm` in the deploy script to fix this:

```bash
. ~/.nvm/nvm.sh
```

## Parse an RSS feed to JSON

```php
function Parse($url){
     $simpleXml = simplexml_load_file($url, "SimpleXMLElement", LIBXML_NOCDATA);
     $json = json_encode($simpleXml);
     return $json;
}
```