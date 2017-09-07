/* eslint-disable no-console */

const log = (...msgs) => console.log(msgs.join())

const time = msg => console.time(msg)

const timeEnd = msg => console.timeEnd(msg)

const warn = (...msgs) => console.warn(msgs.join())

const error = (...msgs) => console.error(msgs.join())

export default {
	log,
	time,
	timeEnd,
	warn,
	error,
}

/* eslint-enable no-console */
