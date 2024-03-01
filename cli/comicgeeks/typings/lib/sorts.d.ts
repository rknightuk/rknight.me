import type { Comic } from './interfaces';
declare type Sorter = 'Alpha' | 'Community' | 'PotW' | 'Price';
declare const _default: Record<Sorter, (a: Comic, b: Comic) => number>;
export default _default;
