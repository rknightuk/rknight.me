"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * Sorts a list alphabetically
     */
    Alpha: (a, b) => {
        const first = removeArticles(a.name.toLowerCase());
        const second = removeArticles(b.name.toLowerCase());
        if (first > second)
            return 1;
        if (first < second)
            return -1;
        return 0;
    },
    /**
     * Sorts a list by community rating
     */
    Community: (a, b) => {
        if (a.rating < b.rating)
            return 1;
        if (a.rating > b.rating)
            return -1;
        return 0;
    },
    /**
     * Sorts a list by Pick of the Week count
     */
    PotW: (a, b) => {
        if (a.potw < b.potw)
            return 1;
        if (a.potw > b.potw)
            return -1;
        return 0;
    },
    /**
     * Sorts a list by price
     */
    Price: (a, b) => {
        const first = Number(a.price.slice(1));
        const second = Number(b.price.slice(1));
        if (first < second)
            return 1;
        if (first > second)
            return -1;
        return 0;
    }
};
function removeArticles(str) {
    const words = str.split(' ');
    return ['a', 'the', 'an'].includes(words[0]) && words[1]
        ? words.slice(1).join(' ')
        : str;
}
