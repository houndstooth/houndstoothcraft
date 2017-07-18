/* eslint-disable no-console */

const log = msg => console.log(msg)

const time = msg => console.time(msg)

const timeEnd = msg => console.timeEnd(msg)

const warn = msg => console.warn(msg)

const error = msg => console.error(msg)

export default {
	log,
	time,
	timeEnd,
	warn,
	error,
}

/* eslint-enable no-console */
