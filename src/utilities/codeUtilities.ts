import { PropertyPath } from './types'

const iterator: { (i: number, options?: { oneIndexed: boolean }): number[] } = (i, options = { oneIndexed: false }) => {
	let iter = []
	for (let j = 0; j < Math.ceil(i); j++) {
		iter.push(j)
	}
	if (options.oneIndexed) {
		iter = iter.map(k => k + 1)
	}
	return iter
}

const wrappedIndex: { <T>({}: { array: T[], index?: number }): T } = ({ array, index = 0 }) => {
	let i
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

const shallowEqual: { <T>(a: T, b: T): boolean } = (a, b) => {
	const sameKeyCount = Object.keys(a).length === Object.keys(b).length
	return sameKeyCount && Object.entries(a).every(([ key, value ]) => value === b[ key ])
}

const deepClone: { (objectToDeepClone: any): any } = objectToDeepClone => {
	const clonedObject = {}
	setAllPropertiesOfObjectOnAnother({
		objectWithProperties: objectToDeepClone,
		objectToChange: clonedObject,
	})
	return clonedObject
}

type SetAllPropertiesOfObjectOnAnother = { ({}: { objectWithProperties: Object, objectToChange: Object }): void }
const setAllPropertiesOfObjectOnAnother: SetAllPropertiesOfObjectOnAnother = params => {
	const { objectWithProperties, objectToChange } = params
	Object.entries(objectWithProperties).forEach(([ propertyName, propertyValue ]) => {
		objectToChange[ propertyName ] = deepCloneMaybeNotObject(propertyValue)
	})
}

const deepCloneMaybeNotObject: { <T>(maybeObjectToDeepClone: T): T } = maybeObjectToDeepClone => {
	let clonedMaybeObject
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

type DeeperPath = { ({}: { propertyPath: PropertyPath, propertyName: string }): PropertyPath }

const deeperPath: DeeperPath = ({ propertyPath, propertyName }) => {
	const path = propertyPath.slice()
	path.push(propertyName)
	return path as PropertyPath
}

type AccessChildPropertyOrCreatePath = { ({}: { objectWithProperties: object, propertyPath: PropertyPath }): any }

const accessChildPropertyOrCreatePath: AccessChildPropertyOrCreatePath = ({ objectWithProperties, propertyPath }) => {
	let childProperty = objectWithProperties
	propertyPath.forEach(pathStep => {
		if (!isDefined(childProperty[ pathStep ])) {
			childProperty[ pathStep ] = {}
		}
		childProperty = childProperty[ pathStep ]
	})
	return childProperty
}

const defaultToTrue: { <T>(property: T): T | boolean } = property => isDefined(property) ? property : true

const isDefined: { <T>(property: T): boolean } = property => typeof property !== 'undefined'

type PropertyIsDefinedOnObject = { ({}: { objectWithProperties: object, propertyName: string }): boolean }

const propertyIsDefinedOnObject: PropertyIsDefinedOnObject = ({ propertyName, objectWithProperties }) => {
	return isDefined(objectWithProperties[ propertyName ])
}

type ChangeObjectIntoCopy = { ({}: { objectToChange: object, objectWithProperties: object }): void }
const changeObjectIntoCopy: ChangeObjectIntoCopy = ({ objectToChange, objectWithProperties }) => {
	Object.keys(objectToChange).forEach(key => delete objectToChange[ key ])
	setAllPropertiesOfObjectOnAnother({ objectWithProperties, objectToChange })
}

const reversed: { <T>(array: T[]): T[] } = array => array.slice().reverse()

export {
	iterator,
	wrappedIndex,
	shallowEqual,
	deepClone,
	deepCloneMaybeNotObject,
	deeperPath,
	accessChildPropertyOrCreatePath,
	defaultToTrue,
	isDefined,
	propertyIsDefinedOnObject,
	changeObjectIntoCopy,
	reversed,
}
