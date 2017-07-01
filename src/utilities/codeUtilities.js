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

const shallowEqual = (a, b) => {
	const sameKeyCount = Object.keys(a).length === Object.keys(b).length
	return sameKeyCount && Object.entries(a).every(([ key, value ]) => value === b[key])
}

const deepClone = objectToClone => {
	let clonedObject = {}
	Object.entries(objectToClone).forEach(([ key, value ]) => {
		if (value instanceof Array) {
			clonedObject[key] = value.slice()
		} else if (typeof value === 'object') {
			clonedObject[key] = deepClone(value)
		} else {
			clonedObject[key] = value
		}
	})
	return clonedObject
}

const resetObject = ({ objectToReset, objectToResetTo }) => {
	Object.keys(objectToResetTo).forEach(key => objectToReset[ key ] = objectToResetTo[ key ])
}

const deeperPath = ({ nestedPropertyPath, propertyName }) => {
	const deeperPath = nestedPropertyPath.slice()
	deeperPath.push(propertyName)
	return deeperPath
}

const accessChildObjectOrCreatePath = ({ parentObject, nestedPropertyPath }) => {
	let childObject = parentObject
	nestedPropertyPath.forEach(pathStep => {
		if (!childObject[ pathStep ]) childObject[ pathStep ] = {}
		childObject = childObject[ pathStep ]
	})
	return childObject
}

export default {
	iterator,
	wrappedIndex,
	shallowEqual,
	deepClone,
	resetObject,
	deeperPath,
	accessChildObjectOrCreatePath,
}
