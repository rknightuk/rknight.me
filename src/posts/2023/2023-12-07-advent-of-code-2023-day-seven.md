---
title: "Advent of Code 2023: Day Seven"
permalink: /advent-of-code-2023-day-seven/index.html
date: 2023-12-07T15:45:19.743Z
excerpt: "My solution for \"Camel Cards\""
layout: post
tags:
    - Development
    - AdventOfCode
---

Time to play some matches of legally-distinct-from-poker-and-easy-to-play-on-a-camel[^1] card game.

### Part One

Each hand has five cards and a score:

```bash
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
```

Each hand outranks others based on how many cards of each type it has, starting at five of a kind and ending with high card. Here's the array I was using to test out my hand rank calculator:

```php
$scores = [
    'AAAAA', // five of a kind / rank 7
    'AA8AA', // four of a kind / rank 6
    '23332', // full house / rank 5
    'TTT98', // three of a kind / rank 4
    '23432', // two pair / rank 3
    'A23A4', // one pair / rank 2
    '23456' // high card / rank 1
];
```

All the hands need to be ordered by their rank and in the result of a tie, compare the hands's first value and if those are the same the second value, and so on. Some values are letters rather than numbers, and ace is high:

```php
$highValues = [
    'A' => 14,
    'K' => 13,
    'Q' => 12,
    'J' => 11,
    'T' => 10,
];
```

Once they've all been ranked, multiply that rank by the score and add them together to get the answer. The lowest rank is 1 and upwards to however many hands we have.

Like [previous days](https://rknight.me/blog/tags/adventofcode/) PHP has some handy functions to make this easier. [`count_chars`](https://www.php.net/manual/en/function.count-chars.php) "counts the number of occurrences of every byte-value in a string". [`chr`](https://www.php.net/manual/en/function.chr.php) then converts that back to the number or letter:

```php
$count = count_chars('12344', 1);

// output
[
	49 => 1,
	50 => 1,
	51 => 1,
	52 => 2,
]

chr(52);
// 4
```

Once I had my counts for each hands, I make this `calculateHandRank` function to return a rank between one and seven depending on the hand. Based on how many elements the array has (and the product in some cases) I can work out the rank easily. [Lewis has a more elegant solution](https://lewisdale.dev/post/advent-of-code-2023-day-seven/) thay works when the counts are ordered but the result is the ultimately the same:

```php
function calculateHandRank($counts) {
    $count = count($counts);
    switch($count) {
        case 2:
            return array_product(array_values($counts)) === 4 ? 6 : 5;
        case 3:
            return array_product(array_values($counts)) === 3 ? 4 : 3;
        case 4:
            return 2;
        case 5:
            return 1;
        default:
            return 7;
    }
};
```

Part of ranking the hands is the tie-breaker I mentioned above, based on each card compared to the other hand. So if we had two hands that were both five of a kind, the first one would win because A (ace) is higher than Q (queen):

```bash
'AAAAA'
'QQQQQ'
```

Here it us all together to get the answer for part one:

```php
// extract the hands and scores, caclulate the hand types
$formatted = array_map(function ($line) {
    [$cards, $score] = explode(' ', $line);
    $score = (int) $score;
    $counts = count_chars($cards, 1);
    $cards = str_split($cards, 1);
    $handType = calculateHandRank($counts);
    return compact('cards', 'score', 'handType');
}, $lines);

// sort the hands by type, compare the card values in the event of a tie break
usort($formatted, function ($a, $b) use ($highValues) {
    if ($a['handType'] === $b['handType']) {
        foreach ($a['cards'] as $index => $aCard)
        {
            $aCard = $highValues[$aCard] ?? $aCard;
            $bCard = $b['cards'][$index];
            $bCard = $highValues[$b['cards'][$index]] ?? $b['cards'][$index];

            if ($aCard === $bCard) {
                continue;
            }

            return $aCard > $bCard ? 1 : -1;
        }
    }
    return $a['handType'] > $b['handType'] ? 1 : -1;
});

// calculate the overall score 
$score = 0;

foreach ($formatted as $index => $line) {
    $score += $line['score'] * ($index + 1);
}

echo $score . PHP_EOL;
```

### Part Two

Part two introduced a fun twist. `J` is now a joker instead of the jack/11. In the event of a tie break, the joker is worth 1 but if it exists in a hand the it goes towards whichever grouping would increase the hands type. For example, this three of a kind hand becomes four of a kind:

```php
$before = 'AAA5J'; // three of a kind
$after = 'AAA5A'; // four of a kind
```

I updated my formatting code to account for, using `count_chars` to find which value the joker should become:

```php
$formatted = array_map(function ($line) use ($highValues) {
    [$cards, $score] = explode(' ', $line);
    $score = (int) $score;
    $counts = count_chars($cards, 1);
    if (strpos($cards, 'J') !== false) {
        // get the highest grouping character
        $highest = 0;
        $character = null;
        $index = null;
        foreach ($counts as $char => $count) {
            if (chr($char) === 'J') {
                continue;
            }
            $fChar = (int) ($highValues[chr($char)] ?? chr($char));
            if ($count === $highest) {
                // compare the numbers/cards instead of the count
                if ($fChar < $character) {
                    continue;
                }
                $highest = $count;
                $character = $fChar;
                $index = $char;
            } else if ($count > $highest) {
                $highest = $count;
                $character = $fChar;
                $index = $char;
            }
        }
        $newCards = str_replace('J', chr($index), $cards);
        $counts = count_chars($newCards, 1);
    }
    $cards = str_split($cards, 1);
    $handType = calculateHandRank($counts);
    return compact('cards', 'score', 'handType');
}, $lines);
```

Finally, I swapped the `J` value for 1:

```diff
$highValues = [
-    'J' => 11,
+    'J' => 1,
];
```

I ran the code and got a warning:

```txt
chr(): Passing null to parameter #1 ($codepoint) of type int is deprecated
```

One of the edge cases (maybe the only one?) was a hand that was five of a kind of all `J` cards. I hadn't accounted for this in my new code for locating the joker replacement; I was skipping every card that was a `J` so it never the replacement index would be `null``. One more quick change and I had part two finished.

```diff
+ $replace = $index ? chr($index) : 'A';
- $newCards = str_replace('J', $chr($index), $cards);
+ $newCards = str_replace('J', $replace, $cards);
```

This was a nice one today. Easy to understand but complicated enough to be a challenge.

My solution is [on GitHub](https://github.com/rknightuk/adventofcode/tree/main/2023/07).

[^1]: Told you the story was bonkers