const iterator = (iterations, options = { oneIndexed: false }) => {
	let iterator = [ ...Array(Math.ceil(iterations)).keys() ]
	if (options.oneIndexed) iterator = iterator.map(k => k + 1)
	return iterator
}

const wrappedIndex = ({ array, index = 0 }) => {
	let i
	if (index < 0) {
		i = array.length - (Math.abs(index) % array.length)
		if (i === array.length) i = 0
	} else {
		i = index % array.length
	} 
	return array[ i ]
}

export default {
	iterator,
	wrappedIndex,
}
