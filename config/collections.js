const fs = require('fs')
const writingStats = require('writing-stats')
const moment = require('moment')
const { url } = require('inspector')
const { DateTime } = require('luxon')

function processPostFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8')
        // remove front matter
        content = content.replace(/---\n.*?\n---/s, '')
        // remove empty lines
        content = content.replace(/^\s*[\r\n]/gm, '')
        const codeBlockMatches = content.match(/```(.*?)```/gis)
        const codeBlocks = codeBlockMatches ? codeBlockMatches.length : 0
        // remove code blocks
        content = content.replace(/(```.+?```)/gms, '')
        const stats = writingStats(content)
        return {
            characterCount: stats.characterCount,
            codeBlockCount: codeBlocks,
            paragraphCount: stats.paragraphCount,
            wordCount: stats.wordCount
        }
    }
    catch (err) {
        console.error(err)
        return {
            characterCount: 0,
            codeBlockCount: 0,
            paragraphCount: 0,
            wordCount: 0
        }
    }
}

function makeYearStats(currentYear, yearPostCount, yearWordCount, yearCodeBlockCount, avgDays, yearCharacterCount, yearParagraphCount) {
    const daysInYear = ((currentYear % 4 === 0 && currentYear % 100 > 0) || currentYear % 400 == 0) ? 366 : 365;

    return {
        year: currentYear,
        daysInYear: daysInYear,
        postCount: yearPostCount,
        wordCount: yearWordCount,
        codeBlockCount: yearCodeBlockCount,
        avgDays: parseFloat(avgDays.toFixed(2)),
        avgCharacterCount: parseFloat((yearCharacterCount / yearPostCount).toFixed(2)),
        avgCodeBlockCount: parseFloat((yearCodeBlockCount / yearPostCount).toFixed(2)),
        avgParagraphCount: parseFloat((yearParagraphCount / yearPostCount).toFixed(2)),
        avgWordCount: parseFloat((yearWordCount / yearPostCount).toFixed(2))
    }
}

const makePath = (type) => {
    const year = new Date().getFullYear()
    return `src/posts/${type}/**/*.md`
}

module.exports = {
    pagesForOg: (collectionApi) => {
        const pages = collectionApi.getAll()
            .filter(p => {
                const notAPost = !['post', 'link', 'almanac', 'changelog', 'note'].includes(p.data.layout)
                const hasNavigation = p.data.eleventyNavigation

                return notAPost && hasNavigation
            }).map(p => {
                return {
                    title: p.data.title.toLowerCase(),
                    url: p.url,
                    icon: p.url.startsWith('/notes/') ? 'signature' : 'logo'
                }
            })

        return [
            ...pages,
            {
                title: 'from the desk of robb knight',
                url: '/notes/single/',
                icon: 'signature',
            },
            {
                title: 'please, my website, she\'s very sick',
                url: '/404/',
                icon: '404',
            },
            {
                title: 'an entry in the almanac',
                url: '/almanac/single/',
                icon: 'logo',
            },
        ]
    },
    postsForOg: (collectionApi) => {
        return collectionApi.getAll()
            .filter(p => {
                if (['post', 'link', 'changelog'].includes(p.data.layout)) return true

                if (p.data.layout === 'almanac') {
                    const d = DateTime.fromISO(p.data.date.toISOString())
                        .setZone('Europe/London')

                    return DateTime.now().diff(d, 'days').days <= 90
                }

                return false
            })
    },
    everything: (collectionApi) => {
        return collectionApi.getAll()
            .filter(p => ['post', 'link', 'almanac', 'changelog', 'note'].includes(p.data.layout))
            .sort((a,b) => (a.data.date < b.data.date) ? 1 : ((b.data.date < a.data.date) ? -1 : 0))
    },
    posts: (collectionApi) => {
        let posts = collectionApi.getFilteredByGlob(makePath('blog')).filter(p => {
            return !p.data.rssClub
        }).reverse()

        for(let i = 0; i < posts.length ; i++) {
            const nextPost = posts[i-1];
            const prevPost = posts[i + 1];
    
            posts[i].data["nextPost"] = nextPost;
            posts[i].data["prevPost"] = prevPost;
        }
    
        return posts
    },
    featuredPosts: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('blog')).filter(p => {
            return !p.data.rssClub && p.data.featured
        }).reverse()
    },
    firstPosts: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('blog')).filter(p => {
            return !p.data.rssClub
        }).reverse().slice(0, 5)
    },
    postsForFeed: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('blog')).reverse().slice(0, 50)
    },
    links: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('links')).reverse()
    },
    changelog: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('changelog')).reverse()
    },
    changelogForFeed: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('changelog')).reverse().filter(p => {
            return moment(p.date).isBefore(moment().startOf('day'))
        })
    },
    almanac: (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/posts/almanac/**/*.md").reverse()
    },
    almanacBackdrops: (collectionApi) => {
        return {
            movie: fs.readdirSync('src/assets/catalog/almanac/movie/bd'),
            tv: fs.readdirSync('src/assets/catalog/almanac/tv/bd'),
        }
    },
    almanacGrouped: (collectionApi) => {
        const data = {}
        const collection = collectionApi.getFilteredByGlob("src/posts/almanac/**/*.md").reverse()

        collection.forEach(entry => {
            let key = null
            if (entry.data.tmdbid) {
                key = `${entry.data.type}-${entry.data.tmdbid}`
            }

            if (entry.data.giantbombid) {
                key = `${entry.data.type}-${entry.data.giantbombid}`
            }

            if (!key) return

            if (!data[key]) {
                data[key] = []
            }

            data[key].push({
                title: entry.data.title,
                permalink: entry.data.permalink,
                date: entry.data.date,
            })
        });

        return data
    },
    almanacMovies: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('almanac/movies')).reverse()
    },
    almanacTV: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('almanac/tv')).reverse()
    },
    almanacBooks: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('almanac/books')).reverse()
    },
    almanacGames: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('almanac/games')).reverse()
    },
    notes: (collectionApi) => {
        return collectionApi.getFilteredByGlob(makePath('notes')).reverse()
    },
    blogTags: (collectionApi) => {
        const allTags = collectionApi.getFilteredByGlob(makePath('blog')).reverse().reduce((tags, p) => {
            if (p.data.tags && Array.isArray(p.data.tags))
            {
                return [...tags, ...p.data.tags]
            }

            return tags
        }, [])

        return [...new Set(allTags)]
    },
    postsByProject: (collectionApi) => {
        const posts = collectionApi.getFilteredByGlob(makePath('blog'))

        const postsByProject = posts.reduce((projects, post) => {
            if (!post.data.project) return projects
            if (!projects[post.data.project])
            {
                projects[post.data.project] = []
            }

            projects[post.data.project].push(post)

            return projects
        }, {})

        return postsByProject
    },
    quotes: (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/pages/intersect/entries/quotes/**/*.md").reverse()
    },
    postStats: (collectionApi) => {
        const oneDayMilliseconds = 1000 * 60 * 60 * 24
        const statsObject = {
            avgDays: 0,
            avgCharacterCount: 0,
            avgCodeBlockCount: 0,
            avgParagraphCount: 0,
            avgWordCount: 0,
            totalWordCount: 0,
            totalCodeBlockCount: 0,
            postCount: 0,
            firstPostDate: new Date(),
            lastPostDate: new Date(),
            highPostCount: 0,
            years: [],
            postsByDay: {},
        }

        let avgDays = 0;
        let totalDays = 0;
        let totalPostCount = 0;
        let totalCharacterCount = 0;
        let totalCodeBlockCount = 0;
        let totalParagraphCount = 0;
        let totalWordCount = 0;
        let yearCharacterCount = 0;
        let yearCodeBlockCount = 0;
        let yearParagraphCount = 0;
        let yearWordCount = 0;
        let yearPostCount = 0;
        let yearPostDays = 0;
        let highPostCount = 0;

        const posts = collectionApi.getFilteredByGlob(makePath('blog')).sort((a, b) => {
            return a.date - b.date
        })

        const postCount = posts.length;
        if (postCount < 1) {
            console.log(`No articles found`);
            return statsObject;
        }

        statsObject.postCount = postCount;
        statsObject.firstPostDate = posts[0].data.page.date;
        statsObject.lastPostDate = posts[postCount - 1].data.page.date;

        let prevPostDate = posts[0].data.page.date;
        let currentYear = prevPostDate.getFullYear();
        
        for (let post of posts) {
            let postDate = post.data.page.date;
            const dateIndexKey = `${moment(postDate).year()}-${moment(postDate).dayOfYear()}`;
            if (!statsObject.postsByDay[dateIndexKey]) {
                statsObject.postsByDay[dateIndexKey] = 0
            }
            statsObject.postsByDay[dateIndexKey]++
            let daysBetween = (postDate - prevPostDate) / oneDayMilliseconds;
            let thisYear = postDate.getFullYear();
            if (thisYear != currentYear) {
                avgDays = yearPostDays / yearPostCount;
                highPostCount = Math.max(highPostCount, yearPostCount);
                statsObject.years.push(
                    makeYearStats(currentYear, yearPostCount, yearWordCount, yearCodeBlockCount, avgDays, yearCharacterCount, yearParagraphCount)
                );
                yearCharacterCount = 0;
                yearCodeBlockCount = 0;
                yearParagraphCount = 0;
                yearWordCount = 0;
                yearPostCount = 0;
                yearPostDays = 0;
                currentYear = thisYear;
            }
            prevPostDate = postDate;
            totalDays += daysBetween;
            yearPostDays += daysBetween;
            totalPostCount++;
            yearPostCount++;
            const postStats = processPostFile(post.page.inputPath);
            totalCharacterCount += postStats.characterCount;
            yearCharacterCount += postStats.characterCount;
            totalCodeBlockCount += postStats.codeBlockCount;
            yearCodeBlockCount += postStats.codeBlockCount;
            totalParagraphCount += postStats.paragraphCount;
            yearParagraphCount += postStats.paragraphCount;
            totalWordCount += postStats.wordCount;
            yearWordCount += postStats.wordCount;
        }
        if (yearPostCount > 0) {
            avgDays = yearPostDays / yearPostCount;
            highPostCount = Math.max(highPostCount, yearPostCount);
            statsObject.years.push(
                makeYearStats(currentYear, yearPostCount, yearWordCount, yearCodeBlockCount, avgDays, yearCharacterCount, yearParagraphCount)
            );
        }
        statsObject.avgDays = parseFloat((totalDays / totalPostCount).toFixed(2));
        statsObject.avgCharacterCount = parseFloat((totalCharacterCount / totalPostCount).toFixed(2));
        statsObject.avgCodeBlockCount = parseFloat((totalCodeBlockCount / totalPostCount).toFixed(2));
        statsObject.avgParagraphCount = parseFloat((totalParagraphCount / totalPostCount).toFixed(2));
        statsObject.avgWordCount = parseFloat((totalWordCount / totalPostCount).toFixed(2));
        statsObject.totalWordCount = totalWordCount;
        statsObject.totalCodeBlockCount = totalCodeBlockCount;
        statsObject.highPostCount = highPostCount;
        return statsObject;
    },
}
