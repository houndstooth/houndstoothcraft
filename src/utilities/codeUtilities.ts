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

const deepClone: <T>(objectToDeepClone: T) => T =
	<T>(objectToDeepClone: T): T => {
		const clonedObject = {} as any
		setAllPropertiesOfObjectOnAnother({
			objectToChange: clonedObject,
			objectWithProperties: objectToDeepClone,
		})

		return clonedObject
	}

const setAllPropertiesOfObjectOnAnother: <T>(_: { objectToChange: T, objectWithProperties: T }) => void =
	<T>({ objectToChange, objectWithProperties }: { objectToChange: T, objectWithProperties: T }): void => {
		Object.entries(objectWithProperties).forEach(([ key, value ]: [ string, any ]) => {
			(objectToChange as any)[ key ] = deepCloneMaybeNotObject(value)
		})
	}

const deepCloneMaybeNotObject: <T>(maybeObjectToDeepClone: T) => T =
	<T>(maybeObjectToDeepClone: T): T => {
		let clonedMaybeObject: T
		if (maybeObjectToDeepClone instanceof Array) {
			clonedMaybeObject = maybeObjectToDeepClone.slice() as any
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

const changeObjectIntoCopy: <T>(_: { objectToChange: T, objectWithProperties: T }) => void =
	<T>({ objectToChange, objectWithProperties }: { objectToChange: T, objectWithProperties: T }): void => {
		Object.keys(objectToChange).forEach(key => delete (objectToChange as any)[ key ])
		setAllPropertiesOfObjectOnAnother({ objectWithProperties, objectToChange })
	}

const reversed: <T>(array: T[]) => T[] =
	<T>(array: T[]): T[] => array.slice().reverse()

const isEmpty: (object: object) => boolean =
	(object: object): boolean => Object.keys(object).length === 0 && object.constructor === Object

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
