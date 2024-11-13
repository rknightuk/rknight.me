const { DateTime } = require('luxon')

const nth = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:  return 'st'
        case 2:  return 'nd'
        case 3:  return 'rd'
        default: return 'th'
    }
}

module.exports = {
    dateForFeed: (date) => {
        return date.toISOString()
    },
    isOldPost: (date) => {
        const d = DateTime.fromISO(date.toISOString())
            .setZone('Europe/London')

        return DateTime.now().diff(d, 'years').years > 4
    },
    diffInYears: (date) => {
        const d = DateTime.fromISO(date.toISOString())
            .setZone('Europe/London')

        return Math.floor(DateTime.now().diff(d, 'years').years)
    },
    toDateTime: (date) => {
        return DateTime.fromISO(date)
            .toFormat('yyyy-MM-dd HH:mm:ss')
    },
    isoDateOnlyForDiscussion: (date) => {
        return DateTime.fromISO(date.toISOString())
            .setZone('Europe/London')
            .toFormat('yyyy-MM-dd')
    },
    isoDateOnly: (date) => {
        return DateTime.fromISO(date)
            .setZone('Europe/London')
            .toFormat('yyyy-MM-dd')
    },
    postDate: (date) => {
        const d = DateTime.fromISO(date.toISOString())
            .setZone('Europe/London');

        return `${d.toFormat(`d`)}${nth(d.day)} ${d.toFormat(`LLLL yyyy`)}`
    },
    postTime: (date) => {
        return DateTime.fromISO(date.toISOString())
            .setZone('Europe/London')
            .toFormat('HH:mm')
    },
    postDateNoYear: (date) => {
        const d = DateTime.fromISO(date.toISOString())
            .setZone('Europe/London')

        return `${d.toFormat(`MMMM d`)}${nth(d.day)}`
    },
}
