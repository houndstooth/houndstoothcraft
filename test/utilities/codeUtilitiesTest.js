import codeUtilities from '../../src/utilities/codeUtilities'

describe('code utilities', () => {
	describe('#iterator', () => {
		let iterator
		beforeEach(() => iterator = codeUtilities.iterator )

		it('returns an array of integers counting up', () => {
			expect(iterator(5)).toEqual([ 0, 1, 2, 3, 4 ])
		})

		it('can be one indexed', () => {
			const result = iterator(5, { oneIndexed: true })
			expect(result).toEqual([ 1, 2, 3, 4, 5 ])
		})
	})

	describe('#wrappedIndex', () => {
		let wrappedIndex, index
		const array = [ 'a', 'b', 'c' ]
		beforeEach(() => wrappedIndex = codeUtilities.wrappedIndex )

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
		beforeEach(() => shallowEqual = codeUtilities.shallowEqual )

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

	describe('#deeperPath', () => {
		it('does not mutate the passed property path', () => {
			const nestedPropertyPath = [ 'colorConfig', 'assignment' ]
			const propertyName = 'set'

			const deeperPath = codeUtilities.deeperPath({ nestedPropertyPath, propertyName })

			expect(deeperPath).toEqual([ 'colorConfig', 'assignment', 'set' ])
			expect(nestedPropertyPath).toEqual([ 'colorConfig', 'assignment' ])
		})
	})

	describe('#resetObject', () => {
		it('reassigns each of the immediate keys', () => {
			const objectToReset = {
				colorConfig: {
					set: [ 0, 1 ],
				},
				mode: 'COOLNESS',
			}
			const objectToResetTo = {
				mode: 'OG_NESS',
				foo: 'bar',
			}

			codeUtilities.resetObject({ objectToReset, objectToResetTo })

			const expectedObject = {
				colorConfig: {
					set: [ 0, 1 ],
				},
				mode: 'OG_NESS',
				foo: 'bar',
			}
			expect(objectToReset).toEqual(expectedObject)
		})
	})

	describe('#accessChildObjectOrCreatePath', () => {
		it('accesses child object if it exists', () => {
			const expectedObject = {}
			const parentObject = {
				childPathFirstStep: {
					childPathSecondStep: expectedObject,
				},
			}
			const nestedPropertyPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childObject = codeUtilities.accessChildObjectOrCreatePath({ parentObject, nestedPropertyPath })

			expect(childObject).toBe(expectedObject)
		})

		it('creates the path for this object and sets it to an empty object if it does not exist', () => {
			const parentObject = {}
			const nestedPropertyPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childObject = codeUtilities.accessChildObjectOrCreatePath({ parentObject, nestedPropertyPath })

			expect(childObject).toEqual({})
			expect(parentObject).toEqual({
				childPathFirstStep: {
					childPathSecondStep: {},
				},
			})
		})
	})

	describe('#deepClone', () => {
		it('deep clones an object, including functions', () => {
			const anImmutableString = 'a string'
			const anImmutableNumber = 9
			const anImmutableFunction = p => p * 3
			const originalArray = [ 'a', 2, { what: 'ever' } ]
			const originalDeepNestedObject = { deepNestedProperty: 'cool beans' }
			const originalImmediateNestedObject = { deepNestedObject: originalDeepNestedObject }
			const originalObject = {
				anImmutableString,
				anImmutableNumber,
				anImmutableFunction,
				anArray: originalArray,
				immediateNestedObject: originalImmediateNestedObject,
			}

			const actualObject = codeUtilities.deepClone(originalObject)

			expect(actualObject.anImmutableString).toBe(originalObject.anImmutableString)
			expect(actualObject.anImmutableNumber).toBe(originalObject.anImmutableNumber)
			expect(actualObject.anImmutableFunction).toBe(originalObject.anImmutableFunction)

			expect(actualObject.anArray).not.toBe(originalObject.anArray)
			expect(actualObject.anArray).toEqual(originalObject.anArray)

			expect(actualObject.immediateNestedObject).not.toBe(originalObject.immediateNestedObject)
			expect(actualObject.immediateNestedObject).toEqual(originalObject.immediateNestedObject)

			expect(actualObject.immediateNestedObject.deepNestedObject).not.toBe(
				originalObject.immediateNestedObject.deepNestedObject
			)
			expect(actualObject.immediateNestedObject.deepNestedObject).toEqual(
				originalObject.immediateNestedObject.deepNestedObject
			)
		})
	})
})
