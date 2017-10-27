// tslint:disable:no-any

const iterator: (i: number, options?: { oneIndexed: boolean }) => number[] = (i, options = { oneIndexed: false }) => {
	let iter: number[] = []
	for (let j = 0; j < Math.ceil(i); j++) {
		iter.push(j)
	}
	if (options.oneIndexed) {
		iter = iter.map(k => k + 1)
	}

	return iter
}

const wrappedIndex: <T>(_: { array: T[], index?: number }) => T = ({ array, index = 0 }) => {
	let i: number
	if (index < 0) {
		i = array.length - Math.abs(index) % array.length
		if (i === array.length) {
			i = 0
		}
	}
	else {
		i = index % array.length
	}

	return array[ i ]
}

const shallowEqual: (a: any, b: any) => boolean = (a, b) => {
	const sameKeyCount: boolean = Object.keys(a).length === Object.keys(b).length

	return sameKeyCount && Object.entries(a).every(([ key, value ]: [ string, any ]): boolean => value === b[ key ])
}

const deepClone: (objectToDeepClone: any) => any = objectToDeepClone => {
	const clonedObject = {}
	setAllPropertiesOfObjectOnAnother({
		objectToChange: clonedObject,
		objectWithProperties: objectToDeepClone,
	})

	return clonedObject
}

const setAllPropertiesOfObjectOnAnother: (_: {
	objectToChange: any, objectWithProperties: any,
}) => void = ({ objectToChange, objectWithProperties }) => {
	Object.entries(objectWithProperties).forEach(([ key, value ]) => {
		objectToChange[ key ] = deepCloneMaybeNotObject(value)
	})
}

const deepCloneMaybeNotObject: <T>(maybeObjectToDeepClone: T) => T = maybeObjectToDeepClone => {
	let clonedMaybeObject: any
	if (maybeObjectToDeepClone instanceof Array) {
		clonedMaybeObject = maybeObjectToDeepClone.slice()
	}
	else if (maybeObjectToDeepClone && typeof maybeObjectToDeepClone === 'object') {
		clonedMaybeObject = deepClone(maybeObjectToDeepClone)
	}
	else {
		clonedMaybeObject = maybeObjectToDeepClone
	}

	return clonedMaybeObject
}

const isDefined: <T>(property: T) => boolean = property => typeof property !== 'undefined'

const changeObjectIntoCopy: (_: {
	objectToChange: any, objectWithProperties: any,
}) => void = ({ objectToChange, objectWithProperties }) => {
	Object.keys(objectToChange).forEach(key => delete objectToChange[ key ])
	setAllPropertiesOfObjectOnAnother({ objectWithProperties, objectToChange })
}

const reversed: <T>(array: T[]) => T[] = array => array.slice().reverse()

const isEmpty: (object: object) => boolean = object => Object.keys(object).length === 0 && object.constructor === Object

export {
	iterator,
	wrappedIndex,
	shallowEqual,
	deepClone,
	deepCloneMaybeNotObject,
	isDefined,
	changeObjectIntoCopy,
	reversed,
	isEmpty,
}
