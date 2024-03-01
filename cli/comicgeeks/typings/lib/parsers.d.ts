/// <reference types="cheerio" />
import type { Comic } from './interfaces';
declare type Parser = 'Issue' | 'Series';
export declare type ParserFunction = ($: cheerio.Root) => (_: number, el: cheerio.Element) => Comic;
declare const _default: Record<Parser, ParserFunction>;
export default _default;
