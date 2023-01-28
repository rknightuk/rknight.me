const pluginRss = require("@11ty/eleventy-plugin-rss");
const util = require('util')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const marked = require('marked')
const { DateTime } = require("luxon")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("timestamp", () => Date.now());

  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/posts/**/*.md").reverse()
  });

  eleventyConfig.addFilter('console', function(value) {
    const str = util.inspect(value);
    return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`
  });

  eleventyConfig.addCollection("firstPosts", function(collection) {
    return collection.getFilteredByGlob("src/posts/**/*.md").reverse().slice(0, 5)
  });

  eleventyConfig.addFilter("isoDateOnly", function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  })

  eleventyConfig.addFilter("toDateTime", function(date) {
    const formatted = DateTime.fromSeconds(parseInt(date, 10))

    const trail = (number) => {
        return parseInt(number, 10) < 10 ? `0${number}` : number
    }

    return `${trail(formatted.day)}-${trail(formatted.month)}-${formatted.year} ${trail(formatted.hour)}:${trail(formatted.minute)}`
  })

  eleventyConfig.addFilter('stripIndex', function(path) {
    return path.replace('/index.html', '/');
  })

  eleventyConfig.addFilter('mdToHtml', function(content) {
    return marked.parse(content)
  })

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public"
    }
  };
};
