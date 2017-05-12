export default (iterations, options = {oneIndexed: false}) => {
	const iterator = [ ...Array(iterations).keys() ]
	if (options.oneIndexed) return iterator.map(k => k + 1)
	return iterator
}