/* eslint-disable no-console */

const log = msg => console.log(msg)

const time = msg => console.time(msg)

const timeEnd = msg => console.timeEnd(msg)

const warn = msg => console.warn(msg)

export default {
	log,
	time,
	timeEnd,
	warn,
}

/* eslint-enable no-console */
