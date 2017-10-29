// tslint:disable:no-any no-unsafe-any

import { Color } from '../../../../src/render'
import * as codeUtilities from '../../../../src/utilities/codeUtilities'

describe('code utilities', () => {
	describe('#iterator', () => {
		it('returns an array of integers counting up', () => {
			expect(codeUtilities.iterator(5)).toEqual([ 0, 1, 2, 3, 4 ])
		})

		it('can be one indexed', () => {
			const result: number[] = codeUtilities.iterator(5, { oneIndexed: true })
			expect(result).toEqual([ 1, 2, 3, 4, 5 ])
		})
	})

	describe('#wrappedIndex', () => {
		let index: number | undefined
		const array: string[] = [ 'a', 'b', 'c' ]

		it('returns the element of the array at the given index', () => {
			index = 1
			expect(codeUtilities.wrappedIndex({ array, index })).toBe('b')
		})

		it('loops the index around if it is greater than the length of the array', () => {
			index = 4
			expect(codeUtilities.wrappedIndex({ array, index })).toBe('b')
		})

		it('works with negative indices', () => {
			index = -4
			expect(codeUtilities.wrappedIndex({ array, index })).toBe('c')
		})

		it('works with negative indices whose absolute value is equal to the length of the array', () => {
			index = -3
			expect(codeUtilities.wrappedIndex({ array, index })).toBe('a')
		})

		it('defaults the index to 0', () => {
			index = undefined
			expect(codeUtilities.wrappedIndex({ array, index })).toBe('a')
		})
	})

	describe('#shallowEqual', () => {
		it('returns true if two objects have identical key value pairs', () => {
			const a: Color = { r: 5, a: 0 }
			const b: Color = { r: 5, a: 0 }
			expect(codeUtilities.shallowEqual(a, b)).toBe(true)
		})

		it('returns false if two objects have different key counts', () => {
			const a: Color = { r: 5, a: 0 }
			const b: Color = { r: 5, a: 0, g: 5 }
			expect(codeUtilities.shallowEqual(a, b)).toBe(false)
		})

		it('returns false if two objects have different values for a key', () => {
			const a: Color = { r: 5, a: 0 }
			const b: Color = { r: 5, a: 1 }
			expect(codeUtilities.shallowEqual(a, b)).toBe(false)
		})
	})

	describe('#deepCloneMaybeObject', () => {
		it('deep clones objects', () => {
			const actualClone: any = codeUtilities.deepCloneMaybeNotObject({ a: { b: { c: 'cba' } } })
			const expectedClone: any = { a: { b: { c: 'cba' } } }
			expect(actualClone).toEqual(expectedClone)
		})

		it('deep clones arrays', () => {
			const actualClone: string[] = codeUtilities.deepCloneMaybeNotObject([ 'a', 'b', 'c' ])
			const expectedClone: string[] = [ 'a', 'b', 'c' ]
			expect(actualClone).toEqual(expectedClone)
		})

		it('deep clones immutable objects', () => {
			const actualClone: string = codeUtilities.deepCloneMaybeNotObject('abcba')
			const expectedClone: string = 'abcba'
			expect(actualClone).toBe(expectedClone)
		})
	})

	describe('#deepClone', () => {
		let actualObject: any
		let originalObject: any
		beforeEach(() => {
			const anImmutableString: string = 'a string'
			const anImmutableNumber: number = 9
			const anImmutableFunction: (p: number) => number = (p: number): number => p * 3
			const anUndefinedValue: void = undefined
			const originalArray: any[] = [ 'a', 2, { what: 'ever' } ]
			const originalDeepObject: { deeperObject: string } = { deeperObject: 'cool beans' }
			const originalShallowObject: { deepObject: { deeperObject: string } } = { deepObject: originalDeepObject }
			originalObject = {
				anArray: originalArray,
				anImmutableFunction,
				anImmutableNumber,
				anImmutableString,
				anUndefinedValue,
				shallowObject: originalShallowObject,
			}

			actualObject = codeUtilities.deepClone(originalObject)
		})

		it('deep clones settings, including strings', () => {
			expect(actualObject.anImmutableString).toBe(originalObject.anImmutableString)
		})

		it('deep clones settings, including numbers', () => {
			expect(actualObject.anImmutableNumber).toBe(originalObject.anImmutableNumber)
		})

		it('deep clones settings, including functions', () => {
			expect(actualObject.anImmutableFunction).toBe(originalObject.anImmutableFunction)
		})

		it('deep clones settings, including undefined values', () => {
			expect(actualObject.anUndefinedValue).toBeUndefined()
		})

		it('deep clones settings, including arrays', () => {
			expect(actualObject.anArray).not.toBe(originalObject.anArray)
			expect(actualObject.anArray).toEqual(originalObject.anArray)
		})

		it('deep clones settings, including shallow settings', () => {
			expect(actualObject.shallowObject).not.toBe(originalObject.shallowObject)
			expect(actualObject.shallowObject).toEqual(originalObject.shallowObject)
		})

		it('deep clones settings, including deeply nested settings', () => {
			expect(actualObject.shallowObject.deepObject).not.toBe(originalObject.shallowObject.deepObject)
			expect(actualObject.shallowObject.deepObject).toEqual(originalObject.shallowObject.deepObject)
		})

		it('does not modify the cloned object', () => {
			expect(actualObject).toEqual(originalObject)
		})

		it('does not point to the cloned object', () => {
			expect(actualObject).not.toBe(originalObject)
		})
	})

	describe('#isDefined', () => {
		it('returns true if defined', () => {
			expect(codeUtilities.isDefined('pants')).toBe(true)
		})

		it('even returns true if it is defined as false; that is the whole point of this thing', () => {
			expect(codeUtilities.isDefined(false)).toBe(true)
		})

		it('even returns true if it is defined as 0; that is the whole point of this thing', () => {
			expect(codeUtilities.isDefined(0)).toBe(true)
		})

		it('returns false if it is not defined', () => {
			expect(codeUtilities.isDefined(undefined)).toBe(false)
		})
	})

	describe('#changeObjectIntoCopy', () => {
		interface TestObject {
			aaa?: string,
			bbb?: string,
		}

		it('removes all the keys of the object that are not on the one being copied', () => {
			const objectToChange: TestObject = { aaa: 'aaa', bbb: 'bbb' }
			const objectWithProperties: TestObject = {}

			codeUtilities.changeObjectIntoCopy({ objectToChange, objectWithProperties })

			expect(objectToChange.bbb).toBe(undefined)
			expect(objectToChange.aaa).toBe(undefined)
		})

		it('replaces keys of the object with ones from the one being copied', () => {
			const objectToChange: TestObject = { bbb: 'bbb' }
			const objectWithProperties: TestObject = { bbb: 'BBB' }

			codeUtilities.changeObjectIntoCopy({ objectToChange, objectWithProperties })

			expect(objectToChange.bbb).toBe('BBB')
			expect(objectToChange.aaa).toBe(undefined)
		})

		it('adds new keys from the one being copied', () => {
			const objectToChange: TestObject = {}
			const objectWithProperties: TestObject = { aaa: 'aaa' }

			codeUtilities.changeObjectIntoCopy({ objectToChange, objectWithProperties })

			expect(objectToChange.aaa).toBe('aaa')
		})
	})

	describe('#reversed', () => {
		it('returns a reversed version of the passed array', () => {
			const array: number[] = [ 1, 2, 3 ]

			const reversedArray: number[] = codeUtilities.reversed(array)

			expect(reversedArray).toEqual([ 3, 2, 1 ])
		})

		it('does not mutate the passed array', () => {
			const array: number[] = [ 1, 2, 3 ]

			codeUtilities.reversed(array)

			expect(array).toEqual([ 1, 2, 3 ])
		})
	})

	describe('#isEmpty', () => {
		it('returns true if the object has no keys', () => {
			expect(codeUtilities.isEmpty({})).toBe(true)
		})

		it('returns false if the object has at least one key', () => {
			expect(codeUtilities.isEmpty({ imMrMeeseeks: 'look at me' })).toBe(false)
		})
	})
})
