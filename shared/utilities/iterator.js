export default (iterations, options = {oneIndexed: false, countDown: false}) => {
	let iterator = [ ...Array(Math.ceil(iterations)).keys() ]
	if (options.oneIndexed) iterator = iterator.map(k => k + 1)
	if (options.countDown) iterator.reverse()
	return iterator
}