const log = msg => console.log(msg)

const time = msg => console.time(msg)

const timeEnd = msg => console.timeEnd(msg)

export default {
	log,
	time,
	timeEnd
}
