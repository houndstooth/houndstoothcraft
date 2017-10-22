// tslint:disable:max-file-line-count

import * as to from '../to'
import { SettingsPath, SettingsStep } from '../store'

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

const shallowEqual: <T>(a: T, b: T) => boolean = (a, b) => {
	const sameKeyCount = Object.keys(a).length === Object.keys(b).length

	return sameKeyCount && Object.entries(a).every(([ key, value ]) => value === b[ key ])
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
	objectToChange, objectWithProperties,
}) => void = ({ objectToChange, objectWithProperties }) => {
	Object.entries(objectWithProperties).forEach(([ key, value ]) => {
		objectToChange[ key ] = deepCloneMaybeNotObject(value)
	})
}

const deepCloneMaybeNotObject: <T>(maybeObjectToDeepClone: T) => T = maybeObjectToDeepClone => {
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

const defaultToTrue: <T>(property: T) => T | boolean = property => isDefined(property) ? property : true

const isDefined: <T>(property: T) => boolean = property => typeof property !== 'undefined'

const changeObjectIntoCopy: (_: {
	objectToChange: object, objectWithProperties: object,
}) => void = ({ objectToChange, objectWithProperties }) => {
	Object.keys(objectToChange).forEach(key => delete objectToChange[ key ])
	setAllPropertiesOfObjectOnAnother({ objectWithProperties, objectToChange })
}

const reversed: <T>(array: T[]) => T[] = array => array.slice().reverse()

const isEmpty: (object: object) => boolean = object => Object.keys(object).length === 0 && object.constructor === Object

const accessChildPropertyOrCreatePath: (_: {
	objectWithProperties: object, settingsPath: SettingsPath,
}) => any = ({ objectWithProperties, settingsPath }) => {
	let childProperty = objectWithProperties
	settingsPath.forEach(settingsStep => {
		if (!isDefined(childProperty[ settingsStep ])) {
			childProperty[ settingsStep ] = {}
		}
		childProperty = childProperty[ settingsStep ]
	})

	return childProperty
}

const deeperPath: (_: {
	settingName: SettingsStep, settingsPath: SettingsPath,
}) => SettingsPath = ({ settingName, settingsPath }) => {
	const path = settingsPath.slice()
	path.push(settingName)

	return to.SettingsPath(path)
}

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
	changeObjectIntoCopy,
	reversed,
	isEmpty,
}
