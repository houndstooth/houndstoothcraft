const iterator = (iterations, options = { oneIndexed: false, countDown: false }) => {
	let iterator = [ ...Array(Math.ceil(iterations)).keys() ]
	if (options.oneIndexed) iterator = iterator.map(k => k + 1)
	if (options.countDown) iterator.reverse()
	return iterator
}

const wrappedIndex = ({ array, index = 0 }) => array[ Math.abs(index) % array.length ]

export default {
	iterator,
	wrappedIndex
}