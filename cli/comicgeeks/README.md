# comicgeeks

A NodeJS module to get data from League of Comic Geeks

```bash
npm install comicgeeks 
```

## Features

- Fetching weekly release lists
- Fetching search results
- Fetching user pull lists
- Fetching user collections
- Fetching user wish lists
- Filter by publisher, comic format, etc
- Sort by pull count, community rating, price, alphabetically, etc

## Usage

View the full documentation [here](https://maruf99.github.io/comicgeeks/).

Every method to retrieve data is prefixed with `fetch`:

- `fetchReleases`
- `fetchSearchResults`
- `fetchPulls`
- `fetchCollection`
- `fetchWishList`

Each method returns a Promise that resolves with the data. Here are a few examples:

```js
const { fetchReleases, FilterTypes } = require('comicgeeks');
// ES Module or TypeScript: import { fetchReleases, FilterTypes } from 'comicgeeks';

// Fetch regular, digital, and annual DC Comics issues that released on 2020-12-15, and sort them alphabetically
fetchReleases('2020-12-15', {
    publishers: ['DC Comics'],
    filter: [
        FilterTypes.Regular,
        FilterTypes.Digital,
        FilterTypes.Annual
    ],
    sort: SortTypes.AlphaAsc
})
    // Resolves to an array of objects
    .then(console.log)
    .catch(console.error);
```

The return objects will look something like this:

```js
{
    name: 'Batman #105',
    publisher: 'DC Comics',
    url: 'https://leagueofcomicgeeks.com/comic/9430629/batman-105',
    cover: 'https://s3.amazonaws.com/comicgeeks/comics/covers/large-9430629.jpg?1612100060',
    description: 'GHOST STORIES, PART 4 Batman battles Ghost-Maker in the no-holds-barred, bloody conclusion of this epic tale…winner take Gotham City! And the outcome is not what you’re expecting! The future of Gotham City and the fate of...',
    price: '$3.99',
    rating: 84,
    pulls: 9288,
    potw: 2
}
```

Let's try search results.

```js
const { fetchSearchResults, CollectionTypes } = require('comicgeeks');

// Search for 'batman' in issue format
fetchSearchResults('batman', CollectionTypes.Issue)
    // Will resolve to an array of objects, similar to the one above
    .then(console.log)
    .catch(console.error);
```

When fetching user specific data, things become a bit more complicated. Each method will take the user's ID as the first parameter. There is a helper method, `fetchUser` to retrieve the ID from a username.

```js
const { fetchUser } = require('comicgeeks');

fetchUser('maruf99')
    .then(console.log)
    .catch(console.error);

/*
{
    id: 122444,
    name: 'maruf99',
    url: 'https://leagueofcomicgeeks.com/profile/maruf99',
    avatar: 'https://s3.amazonaws.com/comicgeeks/avatars/large-122444.jpg?t=1609863575'
}
 */
```

Let's try fetching a pull list, collection, and wish list.

```js
const {
    CollectionTypes,
    fetchCollection,
    fetchPulls,
    fetchUser,
    fetchWishList,
    SortTypes
} = require('comicgeeks');

fetchUser('maruf99')
     // async/await syntax
    .then(async user => {
        // Fetch the collection
        const collection = await fetchCollection(user.id, CollectionTypes.Series, {
            sort: SortTypes.AlphaAsc
        });

        // Fetch the pull list and order by most pulled
        const pullList = await fetchPulls(user.id, '2021-01-05', {
            sort: SortTypes.MostPulled
        });

        // Fetch the wish list and order by price 
        const wishList = await fetchWishList(user.id, CollectionTypes.Series, {
            sort: SortTypes.HighPrice
        });

        // Do stuff with the data
    })
    .catch(console.error);
```