// tslint:disable:no-any max-file-line-count

import { ObjectOf } from './types'

const iterator: (i: number, options?: { oneIndexed: boolean }) => number[] =
	(i: number, options: { oneIndexed: boolean } = { oneIndexed: false }): number[] => {
		let iter: number[] = []
		for (let j: number = 0; j < Math.ceil(i); j++) {
			iter.push(j)
		}
		if (options.oneIndexed) {
			iter = iter.map((k: number): number => k + 1)
		}

		return iter
	}

const wrappedIndex: <T>(_: { array: T[], index?: number }) => T =
	<T>({ array, index = 0 }: { array: T[], index?: number }): T => {
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

const shallowEqual: <T extends ObjectOf<any>>(a: T, b: T) => boolean =
	<T extends ObjectOf<any>>(a: T, b: T): boolean => {
		const sameKeyCount: boolean = Object.keys(a).length === Object.keys(b).length

		return sameKeyCount && Object.entries(a).every(([ key, value ]: [ string, any ]): boolean => value === b[ key ])
	}

const deepClone: <T>(objectToDeepClone: T) => T =
	<T>(objectToDeepClone: T): T => {
		const clonedObject: any = {} as any
		setAllPropertiesOfObjectOnAnother({ objectToChange: clonedObject, objectWithProperties: objectToDeepClone })

		// tslint:disable:no-unsafe-any
		return clonedObject
	}

const setAllPropertiesOfObjectOnAnother: <T>(_: { objectToChange: T, objectWithProperties: T }) => void =
	// tslint:disable-next-line:max-line-length
	<T extends ObjectOf<any>>({ objectToChange, objectWithProperties }: { objectToChange: T, objectWithProperties: T }): void => {
		Object.entries(objectWithProperties).forEach(([ key, value ]: [ string, any ]) => {
			objectToChange[ key ] = deepCloneMaybeNotObject(value)
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

const isDefined: <T>(property: T) => boolean = <T>(property: T): boolean => typeof property !== 'undefined'

const changeObjectIntoCopy: <T>(_: { objectToChange: T, objectWithProperties: T }) => void =
	// tslint:disable-next-line:max-line-length
	<T extends ObjectOf<any>>({ objectToChange, objectWithProperties }: { objectToChange: T, objectWithProperties: T }): void => {
		Object.keys(objectToChange).forEach((key: string): boolean => delete objectToChange[ key ])
		setAllPropertiesOfObjectOnAnother({ objectWithProperties, objectToChange })
	}

const reversed: <T>(array: T[]) => T[] = <T>(array: T[]): T[] => array.slice().reverse()

const isEmpty: (object: object) => boolean =
	(object: object): boolean => Object.keys(object).length === 0 && object.constructor === Object

const idify: (_: string) => string = (name: string): string => name.replace(/ /g, '-')

const deepEqual: (_: any, __: any) => boolean =
	(a: any, b: any): boolean => {
		if (a === b) {
			return true
		}
		else if (a instanceof Array) {
			if (b instanceof Array) {
				return a.every((el: any, index: number): boolean => deepEqual(el, b[ index ]))
			}
			else {
				return false
			}
		}
		else if (typeof a === 'object') {
			if (b instanceof Array) {
				return false
			}
			else if (typeof b === 'object') {
				return Object.entries(a).every(([ key, value ]: [ string, any ]): boolean =>
					deepEqual(value, b[ key ]))
			}
			else {
				return false
			}
		}

		return false
	}

const hasChild: (_: any, __: string) => boolean =
	(maybeParent: any, childName: string): boolean =>
		!!(maybeParent && isDefined(maybeParent[ childName ]))

export {
	iterator,
	wrappedIndex,
	shallowEqual,
	deepClone,
	deepCloneMaybeNotObject,
	deepEqual,
	isDefined,
	changeObjectIntoCopy,
	reversed,
	isEmpty,
	idify,
	hasChild,
}
