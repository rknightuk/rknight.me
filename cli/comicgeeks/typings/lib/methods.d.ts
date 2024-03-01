import { CollectionTypes } from './constants';
import type { Comic, DateResolvable, FetchOptions, User } from './interfaces';
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
export declare function fetchReleases(date: DateResolvable, options?: Partial<FetchOptions>): Promise<Comic[]>;
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
export declare function fetchPulls(userID: number, date: DateResolvable, options?: Partial<FetchOptions>): Promise<Comic[]>;
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
export declare function fetchCollection(userID: number, format?: CollectionTypes, options?: Partial<FetchOptions>): Promise<Comic[]>;
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
export declare function fetchWishList(userID: number, format?: CollectionTypes, options?: Partial<FetchOptions>): Promise<Comic[]>;
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
export declare function fetchSearchResults(query: string, format?: CollectionTypes): Promise<Comic[]>;
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
export declare function fetchUser(name: string): Promise<User | null>;
