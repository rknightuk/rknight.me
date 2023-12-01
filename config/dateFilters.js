const { DateTime } = require('luxon')

module.exports = {
    dateForFeed: (date) => {
        return new Date(date).toISOString()
    },
    toDateTime: (date) => {
        const formatted = DateTime.fromISO(date)

        const trail = (number) => {
            return parseInt(number, 10) < 10 ? `0${number}` : number
        }

        return `${formatted.year}-${trail(formatted.month)}-${trail(formatted.day)} ${trail(formatted.hour)}:${trail(formatted.minute)}`
    },
    toDateTimeFromUnix: (date) => {
        const formatted = DateTime.fromSeconds(parseInt(date, 10))

        const trail = (number) => {
            return parseInt(number, 10) < 10 ? `0${number}` : number
        }

        return `${formatted.year}-${trail(formatted.month)}-${trail(formatted.day)} ${trail(formatted.hour)}:${trail(formatted.minute)}`
    },
    isoString: (date) => {
        return new Date(date).toISOString()
    },
    isoDateOnly: (date) => {
        let d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        let year = d.getFullYear()

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    },
    postDate: (date) => {
        const nth = (d) => {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
                case 1:  return 'st'
                case 2:  return 'nd'
                case 3:  return 'rd'
                default: return 'th'
            }
        }
        const d = new Date(date)
        const month = d.toLocaleString('default', { month: 'long' })
        const day = d.getDate()
        const nominal = nth(d.getDate())
        const year = d.getFullYear()

        return `${month} ${day}${nominal} ${year}`
    },
    monthDay: (date) => {
        let d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month].join('-');
    }
}
