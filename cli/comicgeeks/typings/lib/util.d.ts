import type { DateResolvable, PublisherResolvable } from './interfaces';
export declare function formatURL(url: string, obj: Record<string, any>): string;
export declare function resolvePublishers(publishers: PublisherResolvable[]): number[];
export declare function resolveDate(date: DateResolvable): string;
