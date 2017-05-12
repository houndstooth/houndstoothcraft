export default (iterations, options = {oneIndexed: false, countDown: false}) => {
	let iterator = [ ...Array(iterations).keys() ]
	if (options.oneIndexed) iterator.map(k => k + 1)
	if (options.countDown) iterator.reverse()
	return iterator
}