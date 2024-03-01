import type { FilterTypes, Publishers, SortTypes } from './constants';
/**
 * Parameters for the HTTP Request
 * @hidden
 */
export interface RequestParameters {
    list: number | string;
    list_option: string;
    user_id: number;
    view: string;
    format: number[];
    publisher: number[];
    date_type: string;
    date: string;
    order: SortTypes;
    title: string;
}
/**
 * Options for fetching comic lists
 */
export interface FetchOptions {
    /**
     * The publishers to include
     */
    publishers: PublisherResolvable[];
    /**
     * An array of types to filter the list with
     */
    filter: FilterTypes[];
    /**
     * The type of sort for the list
     */
    sort: SortTypes;
}
/**
 * Represents a user on League of Comic Geeks
 */
export interface User {
    /**
     * The ID of this user
     */
    id: number;
    /**
     * The name of this user
     */
    name: string;
    /**
     * The URL of this user
     */
    url: string;
    /**
     * The avatar of this user
     */
    avatar: string;
}
/**
 * Represents an item on a pull list on League of Comic Geeks
 */
export interface Comic {
    /**
     * The title and issue/volume number of this item
     */
    name: string;
    /**
     * The publisher for this item
     */
    publisher: string;
    /**
     * The URL of this item
     */
    url: string;
    /**
     * The cover image of this item
     */
    cover: string;
    /**
     * The description of this item
     */
    description?: string;
    /**
     * The price of this item, in USD
     */
    price?: string;
    /**
     * The community rating for this item.
     */
    rating?: number | null;
    /**
     * The amount of users that pulled this item
     */
    pulls?: number | null;
    /**
     * The amount of users that chose this item as their Pick of the Week
     */
    potw?: number;
}
/**
 * An publisher name or ID
 */
export declare type PublisherResolvable = number | keyof typeof Publishers;
/**
 * A Date object or string in ISO 8601 format
 */
export declare type DateResolvable = Date | string;
