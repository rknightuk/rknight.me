"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDate = exports.resolvePublishers = exports.formatURL = void 0;
const constants_1 = require("./constants");
function formatURL(url, obj) {
    const parts = [];
    for (const key of Object.keys(obj)) {
        const val = obj[key];
        if (Array.isArray(val)) {
            for (const v of val)
                parts.push(`${key}[]=${String(v)}`);
        }
        else {
            parts.push(`${key}=${String(val)}`);
        }
    }
    return `${url}?${parts.join('&')}`;
}
exports.formatURL = formatURL;
function resolvePublishers(publishers) {
    return publishers.map(p => {
        if (typeof p === 'number')
            return p;
        if (typeof p === 'string' && Reflect.has(constants_1.Publishers, p))
            return constants_1.Publishers[p];
        throw new TypeError(`'${p}' is not a valid publisher name or ID.`);
    });
}
exports.resolvePublishers = resolvePublishers;
function resolveDate(date) {
    if (date instanceof Date)
        return date.toISOString().split('T')[0];
    if (typeof date !== 'string' || !validDate(date))
        throw new TypeError('The \'date\' parameter must be a Date object or string ISO 8601 format.');
    return date;
}
exports.resolveDate = resolveDate;
function validDate(date) {
    const [year, month, day] = date.split('-');
    if ((year === null || year === void 0 ? void 0 : year.length) === 4 && (month === null || month === void 0 ? void 0 : month.length) === 2 && (day === null || day === void 0 ? void 0 : day.length) === 2)
        return true;
    return false;
}
