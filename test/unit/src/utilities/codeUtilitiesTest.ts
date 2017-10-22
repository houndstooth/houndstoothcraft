import * as codeUtilities from '../../../../src/utilities/codeUtilities'

describe('code utilities', () => {
	describe('#iterator', () => {
		let iterator
		beforeEach(() => iterator = codeUtilities.iterator)

		it('returns an array of integers counting up', () => {
			expect(iterator(5)).toEqual([ 0, 1, 2, 3, 4 ])
		})

		it('can be one indexed', () => {
			const result = iterator(5, { oneIndexed: true })
			expect(result).toEqual([ 1, 2, 3, 4, 5 ])
		})
	})

	describe('#wrappedIndex', () => {
		let wrappedIndex
		let index
		const array = [ 'a', 'b', 'c' ]
		beforeEach(() => wrappedIndex = codeUtilities.wrappedIndex)

		it('returns the element of the array at the given index', () => {
			index = 1
			expect(wrappedIndex({ array, index })).toBe('b')
		})

		it('loops the index around if it is greater than the length of the array', () => {
			index = 4
			expect(wrappedIndex({ array, index })).toBe('b')
		})

		it('works with negative indices', () => {
			index = -4
			expect(wrappedIndex({ array, index })).toBe('c')
		})

		it('works with negative indices whose absolute value is equal to the length of the array', () => {
			index = -3
			expect(wrappedIndex({ array, index })).toBe('a')
		})

		it('defaults the index to 0', () => {
			index = undefined
			expect(wrappedIndex({ array, index })).toBe('a')
		})
	})

	describe('#shallowEqual', () => {
		let shallowEqual
		beforeEach(() => shallowEqual = codeUtilities.shallowEqual)

		it('returns true if two objects have identical key value pairs', () => {
			const a = { r: 5, a: 0 }
			const b = { r: 5, a: 0 }
			expect(shallowEqual(a, b)).toBe(true)
		})

		it('returns false if two objects have different key counts', () => {
			const a = { r: 5, a: 0 }
			const b = { r: 5, a: 0, yo: 'foo' }
			expect(shallowEqual(a, b)).toBe(false)
		})

		it('returns false if two objects have different values for a key', () => {
			const a = { r: 5, a: 0 }
			const b = { r: 5, a: 1 }
			expect(shallowEqual(a, b)).toBe(false)
		})
	})

	describe('#deepCloneMaybeObject', () => {
		it('deep clones objects', () => {
			const actualClone = codeUtilities.deepCloneMaybeNotObject({ a: { b: { c: 'cba' } } })
			const expectedClone = { a: { b: { c: 'cba' } } }
			expect(actualClone).toEqual(expectedClone)
		})

		it('deep clones arrays', () => {
			const actualClone = codeUtilities.deepCloneMaybeNotObject([ 'a', 'b', 'c' ])
			const expectedClone = [ 'a', 'b', 'c' ]
			expect(actualClone).toEqual(expectedClone)
		})

		it('deep clones immutable objects', () => {
			const actualClone = codeUtilities.deepCloneMaybeNotObject('abcba')
			const expectedClone = 'abcba'
			expect(actualClone).toBe(expectedClone)
		})
	})

	describe('#deepClone', () => {
		let actualObject
		let originalObject
		beforeEach(() => {
			const anImmutableString = 'a string'
			const anImmutableNumber = 9
			const anImmutableFunction = p => p * 3
			const anUndefinedValue = undefined
			const originalArray = [ 'a', 2, { what: 'ever' } ]
			const originalDeepObject = { deeperObject: 'cool beans' }
			const originalShallowObject = { deepObject: originalDeepObject }
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
		let isDefined
		beforeEach(() => isDefined = codeUtilities.isDefined)

		it('returns true if defined', () => {
			expect(isDefined('pants')).toBe(true)
		})

		it('even returns true if it is defined as false; that is the whole point of this thing', () => {
			expect(isDefined(false)).toBe(true)
		})

		it('even returns true if it is defined as 0; that is the whole point of this thing', () => {
			expect(isDefined(0)).toBe(true)
		})

		it('returns false if it is not defined', () => {
			expect(isDefined(undefined)).toBe(false)
		})
	})

	describe('#changeObjectIntoCopy', () => {
		let changeObjectIntoCopy
		beforeEach(() => changeObjectIntoCopy = codeUtilities.changeObjectIntoCopy)

		it('removes all the keys of the object that are not on the one being copied', () => {
			const objectToChange: { billy?, mary? } = { billy: 'bob', mary: 'jane' }
			const objectWithProperties = {}

			changeObjectIntoCopy({ objectToChange, objectWithProperties })

			expect(objectToChange.mary).toBe(undefined)
			expect(objectToChange.billy).toBe(undefined)
		})

		it('replaces keys of the object with ones from the one being copied', () => {
			const objectToChange: { billy?, mary? } = { mary: 'jane' }
			const objectWithProperties = { mary: 'had a little lamb' }

			changeObjectIntoCopy({ objectToChange, objectWithProperties })

			expect(objectToChange.mary).toBe('had a little lamb')
			expect(objectToChange.billy).toBe(undefined)
		})

		it('adds new keys from the one being copied', () => {
			const objectToChange: { billy?, mary? } = {}
			const objectWithProperties = { billy: 'bob' }

			changeObjectIntoCopy({ objectToChange, objectWithProperties })

			expect(objectToChange.billy).toBe('bob')
		})
	})

	describe('#reversed', () => {
		let reversed
		beforeEach(() => reversed = codeUtilities.reversed)

		it('returns a reversed version of the passed array', () => {
			const array = [ 1, 2, 3 ]

			const reversedArray = reversed(array)

			expect(reversedArray).toEqual([ 3, 2, 1 ])
		})

		it('does not mutate the passed array', () => {
			const array = [ 1, 2, 3 ]

			reversed(array)

			expect(array).toEqual([ 1, 2, 3 ])
		})
	})

	describe('#isEmpty', () => {
		let isEmpty
		beforeEach(() => isEmpty = codeUtilities.isEmpty)

		it('returns true if the object has no keys', () => {
			expect(isEmpty({ })).toBe(true)
		})

		it('returns false if the object has at least one key', () => {
			expect(isEmpty({ imMrMeeseeks: 'look at me' })).toBe(false)
		})
	})
})
