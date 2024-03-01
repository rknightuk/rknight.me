"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = exports.fetchSearchResults = exports.fetchWishList = exports.fetchCollection = exports.fetchPulls = exports.fetchReleases = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const constants_1 = require("./constants");
const parsers_1 = __importDefault(require("./parsers"));
const sorts_1 = __importDefault(require("./sorts"));
const util_1 = require("./util");
async function _fetchData(params, parser) {
    const url = util_1.formatURL(`${constants_1.BASE_URL}/comic/get_comics`, params);
    const { list } = await node_fetch_1.default(url).then(res => res.json());
    const $ = cheerio_1.default.load(list);
    const data = $('li')
        .map(parser($))
        .get();
    return data;
}
async function _fetchComics(params, options, parser = parsers_1.default.Issue) {
    if (options === null || options === void 0 ? void 0 : options.publishers) {
        if (!Array.isArray(options.publishers))
            throw new TypeError('The \'publishers\' option must be an array of publisher names or IDs.');
        params.publisher = util_1.resolvePublishers(options.publishers);
    }
    if (options === null || options === void 0 ? void 0 : options.filter) {
        if (!Array.isArray(options.filter))
            throw new TypeError(`The 'filter' option must be an array of FilterTypes.`);
        const types = Object.values(constants_1.FilterTypes);
        for (const type of options.filter) {
            if (!types.includes(type))
                throw new RangeError(`The 'filter' option must only include FilterTypes. Received ${type}.`);
        }
        params.format = options.filter;
    }
    if ((options === null || options === void 0 ? void 0 : options.sort) && !Object.values(constants_1.SortTypes).includes(options.sort)) {
        throw new RangeError(`The 'sort' option must be one of '${Object.values(constants_1.SortTypes).join('\', \'')}'. Received '${options.sort}'.`);
    }
    const data = await _fetchData(params, parser);
    if (options === null || options === void 0 ? void 0 : options.sort) {
        switch (options.sort) {
            case constants_1.SortTypes.MostPulled: {
                return data;
            }
            case constants_1.SortTypes.PickOfTheWeek: {
                return data.sort(sorts_1.default.PotW);
            }
            case constants_1.SortTypes.AlphaAsc: {
                return data.sort(sorts_1.default.Alpha);
            }
            case constants_1.SortTypes.AlphaDesc: {
                return data.sort(sorts_1.default.Alpha).reverse();
            }
            case constants_1.SortTypes.LowPrice: {
                return data.sort(sorts_1.default.Price).reverse();
            }
            case constants_1.SortTypes.HighPrice: {
                return data.sort(sorts_1.default.Price);
            }
            case constants_1.SortTypes.CommunityConsensus: {
                return data.sort(sorts_1.default.Community);
            }
        }
    }
    return data;
}
/**
 * Fetches comic releases for a specified week
 * @param id The ID for the publisher
 * @param date The release week, as a Date object or a string in ISO 8601 format
 * @param options The options for fetching the releases
 * @example Fetch the single issue releases for DC Comics with an A-Z sort
 * ```typescript
 * fetchReleases(new Date(), {
 *      publishers: ['DC Comics'],
 *      filter: [
 *          FilterTypes.Regular,
 *          FilterTypes.Digital,
 *          FilterTypes.Annual
 *      ],
 *      sort: SortTypes.AlphaAsc
 * })
 *    .then(console.log)
 *    .catch(console.error);
 * ```
 */
function fetchReleases(date, options) {
    const params = {
        list: 'releases',
        list_option: 'thumbs',
        view: 'list',
        date: util_1.resolveDate(date),
        date_type: 'week'
    };
    return _fetchComics(params, options);
}
exports.fetchReleases = fetchReleases;
/**
 * Fetches a user's pull list for a specified week
 * @param userID The ID for the user
 * @param date The release week, as a Date object or a string in ISO 8601 format
 * @param options The options for fetching the pull list
 * @example
 * ```typescript
 * fetchPulls(122444, new Date(), {
 *  sort: SortTypes.AlphaAsc
 * })
 *    .then(console.log)
 *    .catch(console.error);
 * ```
 */
function fetchPulls(userID, date, options) {
    const params = {
        list: 1,
        list_option: 'thumbs',
        view: 'list',
        user_id: userID,
        date: util_1.resolveDate(date),
        date_type: 'week'
    };
    return _fetchComics(params, options);
}
exports.fetchPulls = fetchPulls;
/**
 * Fetches a user's collection, in either series or issue format
 * @param userID The ID for the user
 * @param format The format to return the results in
 * @param options The options for fetching the collection
 * @example Fetch a collection in series format
 * ```typescript
 * fetchCollection(122444, CollectionTypes.Series, {
 *  sort: SortTypes.AlphaAsc
 * })
 *    .then(console.log)
 *    .catch(console.error);
 * ```
 */
function fetchCollection(userID, format = constants_1.CollectionTypes.Issue, options) {
    const params = {
        list: 2,
        list_option: format,
        view: format === constants_1.CollectionTypes.Issue ? 'list' : 'thumbs',
        user_id: userID
    };
    return _fetchComics(params, options, format === constants_1.CollectionTypes.Issue ? parsers_1.default.Issue : parsers_1.default.Series);
}
exports.fetchCollection = fetchCollection;
/**
 * Fetches a user's wish list, in either series or issue format
 * @param userID The ID for the user
 * @param format The format to return the results in
 * @param options The options for fetching the wish list
 * @example Fetch a wish list in issue format
 * ```typescript
 * fetchWishList(122444, CollectionTypes.Issue, {
 *  sort: SortTypes.AlphaAsc
 * })
 *    .then(console.log)
 *    .catch(console.error);
 * ```
 */
function fetchWishList(userID, format = constants_1.CollectionTypes.Issue, options) {
    const params = {
        list: 3,
        list_option: format,
        view: format === constants_1.CollectionTypes.Issue ? 'list' : 'thumbs',
        user_id: userID
    };
    return _fetchComics(params, options, format === constants_1.CollectionTypes.Issue ? parsers_1.default.Issue : parsers_1.default.Series);
}
exports.fetchWishList = fetchWishList;
/**
 * Fetches search results based on a query
 * @param query The query to search  for
 * @param format The format to return the results in
 * @example
 * ```typescript
 * fetchSearchResults('batman', CollectionTypes.Issue)
 *    .then(console.log)
 *    .catch(console.error);
 * ```
 */
function fetchSearchResults(query, format = constants_1.CollectionTypes.Issue) {
    const params = {
        list: 'search',
        title: query,
        list_option: format
    };
    return _fetchData(params, parsers_1.default.Series);
}
exports.fetchSearchResults = fetchSearchResults;
/**
 * Fetches user details based on a user name, if they exist
 * @param name The name for the user to fetch details for
 * @example Fetch a user
 * ```typescript
 * fetchUser('maruf99')
 *    .then(console.log)
 *    .catch(console.error);
 * ```
 */
async function fetchUser(name) {
    const url = `${constants_1.BASE_URL}/profile/${name.toLowerCase()}`;
    const text = await node_fetch_1.default(`${url}/pull-list`).then(res => res.text());
    const $ = cheerio_1.default.load(text);
    const details = $('#comic-list-block').first();
    const avatar = $('.avatar-user.mr-3 a img').attr('src');
    const id = Number(details.attr('data-user'));
    if (isNaN(id) || !details)
        throw new Error(`User '${name}' not found.`);
    return {
        id: Number(details.attr('data-user')),
        name: $('title').text().slice(0, -47),
        url,
        avatar: avatar !== null && avatar !== void 0 ? avatar : constants_1.DEFAULT_AVATAR
    };
}
exports.fetchUser = fetchUser;
