const { tootText } = require('../config/mastodonFormatter.js')
const { describe, it } = require('node:test')
const assert = require('node:assert')

const fakePost = {
    title: 'This is the title',
    layout: 'post',
    permalink: '/blog/example',
    content: '<p>This is the content</p>\n</p>this is some more content</p>',
}

//<p>You can turn off the stupid margins on the window tiling in MacOS 15.1 by going to Settings &gt; Desktop &amp; Dock &gt; Window Tiling and turn off &quot;Tiled windows have margins&quot;</p>\n<p>You can turn off the stupid margins on the window tiling in MacOS 15.1 by going to Settings &gt; Desktop &amp; Dock &gt; Window Tiling and turn off &quot;Tiled windows have margins&quot;</p>\n

describe('tootText', () => {
    it('should return title and link for normal blog posts', () => {
        assert.strictEqual(tootText(fakePost), 'This is the title https://rknight.me/blog/example');
    });

    it('should include all text if it\'s short enough', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                layout: 'note',
            }),
            'This is the content\n\nthis is some more content\n\nhttps://rknight.me/blog/example'
        );
    })

    it('should truncate if it\s too long', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                layout: 'note',
                content: '<p>Esse aliqua aliquip incididunt deserunt exercitation nostrud incididunt dolor ullamco dolore sunt reprehenderit eiusmod deserunt. Id sint in nostrud irure id pariatur duis culpa esse quis non mollit. Esse mollit adipisicing velit aliquip pariatur aute mollit qui sint ex aliqua. Cillum veniam consequat eiusmod quis reprehenderit minim excepteur tempor pariatur nulla sint mollit nostrud. Lorem aute consectetur sunt nulla excepteur eiusmod officia laborum sunt. Reprehenderit adipisicing exercitation irure nisi veniam elit. Id elit culpa minim et Lorem officia dolor ullamco dolore sunt reprehenderit eiusmod deserunt. Id sint in nostrud irure id pariatur duis culpa esse quis non mollit. Esse mollit adipisicing velit aliquip pariatur aute mollit qui sint ex aliqua. Cillum veniam consequat eiusmod quis reprehenderit minim excepteur tempor pariatur nulla sint mollit nostrud. Lorem aute consectetur sunt nulla excepteur eiusmod officia laborum sunt. Reprehenderit adipisicing exercitation irure nisi veniam elit. Id elit culpa minim et Lorem officia.</p>',
            }),
            'Esse aliqua aliquip incididunt deserunt exercitation nostrud incididunt dolor ullamco dolore sunt reprehenderit eiusmod deserunt. Id sint in nostrud irure id pariatur duis culpa esse quis non mollit. Esse mollit adipisicing velit aliquip pariatur aute mollit qui sint ex aliqua. Cillum veniam consequat eiusmod quis reprehenderit minim excepteur tempor pariatur nulla sint mollit nostrud. Lorem aute consectetur sunt nulla excepteur eiusmod officia laborum sunt. Reprehenderi… https://rknight.me/blog/example'
        );
    })

    it('should inline links', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                layout: 'note',
                content: '<p>This is the content</p>\n</p>this is <a href="https://rknight.me">a link</a></p>',
            }),
            'This is the content\n\nthis is a link (https://rknight.me)\n\nhttps://rknight.me/blog/example'
        );
    })

    it('should wrap blockquotes in quotes', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                layout: 'note',
                content: '<blockquote><p>This is a quote from some person</p></blockquote>\n<p>Some commentary from me</p>',
            }),
            '"This is a quote from some person"\n\nSome commentary from me\n\nhttps://rknight.me/blog/example'
        );
    })

    it('should not include images', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                layout: 'note',
                content: '<blockquote><p>This is a quote from some person</p></blockquote>\n<p>Some commentary from me</p><img src="https://rknight.me/imaxxge.jpg">',
            }),
            '"This is a quote from some person"\n\nSome commentary from me\n\nhttps://rknight.me/blog/example'
        );
    })

    it('should include season for TV if one exists', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                title: 'Top Gear',
                season: 12,
                layout: 'almanac',
                content: '',
                type: 'tv',
            }),
            '📺 Watched: Top Gear Season 12 https://rknight.me/blog/example'
        );
    })

    it('should include platform for games if one exists', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                title: 'Ratchet and Clank',
                platform: 'PS5',
                layout: 'almanac',
                content: '',
                type: 'game',
            }),
            '🎮 Played: Ratchet and Clank (PS5) https://rknight.me/blog/example'
        );
    })


    it('should include review with almanac entries', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                title: 'Top Gear',
                season: 12,
                layout: 'almanac',
                content: '<p>This is a review of this show</p>\n<p>This is some more stuff that I\'ve said about a thing</p>',
                type: 'tv',
            }),
            '📺 Watched: Top Gear Season 12 https://rknight.me/blog/example\n\nThis is a review of this show\n\nThis is some more stuff that I\'ve said about a thing'
        );
    })

    it('should include mastodon author if one exists', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                title: 'A cool link',
                layout: 'link',
                link: 'https://example.com',
                author: {
                    name: 'Joe Steel',
                    web: 'https://sixcolors.com',
                    feed: 'http://feedpress.me/sixcolors',
                    mastodon: 'https://duck.haus/@joesteel',
                },
                content: '',
            }),
            '⭐ A cool link by @joesteel@duck.haus https://example.com\n\n📌 https://rknight.me/blog/example'
        );
    })

    it('should include first line if one exists but the rest is too long', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                title: 'A cool link',
                layout: 'link',
                link: 'https://example.com',
                author: {
                    name: 'Joe Steel',
                    web: 'https://sixcolors.com',
                    feed: 'http://feedpress.me/sixcolors',
                    mastodon: 'https://duck.haus/@joesteel',
                },
                content: `<blockquote><p>This is a quote from the post</p></blockquote><p>${'this is a long thing'.repeat(100)}</p>`,
            }),
            '⭐ A cool link by @joesteel@duck.haus https://example.com\n\n"This is a quote from the post"\n\n📌 Read more: https://rknight.me/blog/example'
        );
    })

    it('should include the entire review if it fits', () => {
        assert.strictEqual(
            tootText({
                ...fakePost,
                title: 'A cool link',
                layout: 'link',
                link: 'https://example.com',
                author: {
                    name: 'Joe Steel',
                    web: 'https://sixcolors.com',
                    feed: 'http://feedpress.me/sixcolors',
                    mastodon: 'https://duck.haus/@joesteel',
                },
                content: `<blockquote><p>This is a quote from the post</p></blockquote><p>this is a short comment</p>`,
            }),
            '⭐ A cool link by @joesteel@duck.haus https://example.com\n\n"This is a quote from the post"\n\nthis is a short comment\n\n📌 https://rknight.me/blog/example'
        );
    })

});