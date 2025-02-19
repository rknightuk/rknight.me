import { DateTime } from 'luxon'

const nth = (d) => {
	if (d > 3 && d < 21) return 'th'
	switch (d % 10) {
		case 1:
			return 'st'
		case 2:
			return 'nd'
		case 3:
			return 'rd'
		default:
			return 'th'
	}
}

const dateForFeedX = (date) => {
	return date.toISOString()
}
const dateForFeed = (date) => {
	return date.toISOString()
}
const isOldPost = (date) => {
	const d = DateTime.fromISO(date.toISOString()).setZone('Europe/London')
	return DateTime.now().diff(d, 'years').years > 4
}
const diffInYears = (date) => {
	const d = DateTime.fromISO(date.toISOString()).setZone('Europe/London')
	return Math.floor(DateTime.now().diff(d, 'years').years)
}
const toDateTime = (date) => {
	return DateTime.fromISO(date).toFormat('yyyy-MM-dd HH:mm:ss')
}
const isoDateOnlyForDiscussion = (date) => {
	return DateTime.fromISO(date.toISOString())
		.setZone('Europe/London')
		.toFormat('yyyy-MM-dd')
}
const isoDateOnly = (date) => {
	return DateTime.fromISO(date).setZone('Europe/London').toFormat('yyyy-MM-dd')
}
const postDate = (date) => {
	const d = DateTime.fromISO(date.toISOString()).setZone('Europe/London')
	return `${d.toFormat(`d`)}${nth(d.day)} ${d.toFormat(`LLLL yyyy`)}`
}
const postTime = (date) => {
	return DateTime.fromISO(date.toISOString())
		.setZone('Europe/London')
		.toFormat('HH:mm')
}
const postDateNoYear = (date) => {
	const d = DateTime.fromISO(date.toISOString()).setZone('Europe/London')
	return `${d.toFormat(`MMMM d`)}${nth(d.day)}`
}
export default {
	dateForFeed,
	isOldPost,
	diffInYears,
	toDateTime,
	isoDateOnlyForDiscussion,
	isoDateOnly,
	postDate,
	postTime,
	postDateNoYear,
}
