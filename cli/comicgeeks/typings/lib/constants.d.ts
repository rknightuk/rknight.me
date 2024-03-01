/** @hidden */
export declare const BASE_URL = "https://leagueofcomicgeeks.com";
/** @hidden */
export declare const DEFAULT_AVATAR: string;
/**
 * The types that collections of comics can be fetched with
 *
 * - Issue - Return each item as a separate issue
 *
 * - Series - Return the individual series for each item
 */
export declare enum CollectionTypes {
    Issue = "issue",
    Series = "series"
}
/**
 * The types that comic lists can be filtered with
 *
 * - Regular - Regular issues
 *
 * - Variant - Variant issues or reprints
 *
 * - Trade - Trade paperbacks
 *
 * - Hardcover - Hardcovers
 *
 * - Digital - Digital issues
 *
 * - Annual - Annuals
 */
export declare enum FilterTypes {
    Regular = 1,
    Variant = 2,
    Trade = 3,
    Hardcover = 4,
    Digital = 5,
    Annual = 6
}
/**
 * The types that comic lists can be sorted by
 *
 * - MostPulled - Most Pulled
 *
 * - PickOfTheWeek - Pick of the Week
 *
 * - AlphaAsc - Alphabetical (A-Z)
 *
 * - AlphaDesc - Alphabetical (Z-A)
 *
 * - LowPrice - Price (Low to High)
 *
 * - HighPrice - Price (High to Low)
 *
 * - CommunityConsensus - Community Consensus
 */
export declare enum SortTypes {
    MostPulled = "pulls",
    PickOfTheWeek = "potw",
    AlphaAsc = "alpha-asc",
    AlphaDesc = "alpha-desc",
    LowPrice = "price-asc",
    HighPrice = "price-desc",
    CommunityConsensus = "community"
}
/**
 * A list of supported publishers with IDs
 */
export declare const Publishers: Record<string, number>;
