"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
exports.default = {
    Issue: $ => (_, el) => {
        const element = $(el);
        const cover = element.find('.cover img').attr('data-src').replace('medium', 'large');
        const cover_medium = element.find('.cover img').attr('data-src');
        const cover_small = element.find('.cover img').attr('data-src').replace('medium', 'small');
        const [publisher] = element.find('.copy-really-small span').text().split('\r');
        const description = element.find('.comic-description.col-feed-max');
        const url = `${constants_1.BASE_URL}${element.find('.link-collection-series').attr('href')}`;
        const pulls = element.attr('data-pulls');
        const potw = element.attr('data-potw');
        const rating = element.attr('data-community');
        description.find('a').remove();
        return {
            name: element.find('.title.color-primary').text().trim(),
            publisher: publisher === null || publisher === void 0 ? void 0 : publisher.trim(),
            url,
            cover: cover === '/assets/images/no-cover-med.jpg' ? `${constants_1.BASE_URL}${cover.replace('-med', '-lg')}` : cover,
            cover_medium,
            cover_small,
            description: description.text().trim(),
            price: element.find('.price').text().trim(),
            rating: (rating === null || rating === void 0 ? void 0 : rating.length) ? Number(rating) : null,
            pulls: (pulls === null || pulls === void 0 ? void 0 : pulls.length) ? Number(pulls) : null,
            potw: (potw === null || potw === void 0 ? void 0 : potw.length) ? Number(potw) : null,
            date_unix: element.find('.date').data('date'),
            date_string: element.find('.date').text().trim(),
        };
    },
    Series: $ => (_, el) => {
        const element = $(el);
        return {
            name: element.find('.title.color-primary').text().trim(),
            publisher: element.find('.publisher.color-offset').text().trim(),
            url: `${constants_1.BASE_URL}${element.find('.cover a').attr('href')}`,
            cover: element.find('.cover img').attr('data-src').replace('medium', 'large'),
            cover_medium: element.find('.cover img').attr('data-src'),
            cover_small: element.find('.cover img').attr('data-src').replace('medium', 'small'),
            date: element.find('.series').text().trim(),
            date_start: element.find('.series').data('begin'),
            date_end: element.find('.series').data('end'),
        };
    }
};
