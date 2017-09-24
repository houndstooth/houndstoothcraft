import * as codeUtilities from '../../../src/utilities/codeUtilities'

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
		let wrappedIndex, index
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

	describe('#deeperPath', () => {
		it('does not mutate the passed objects path', () => {
			const propertyPath = [ 'colorSettings', 'assignment' ]
			const propertyName = 'colorSet'

			const deeperPath = codeUtilities.deeperPath({ propertyPath, propertyName })

			expect(deeperPath).toEqual([ 'colorSettings', 'assignment', 'colorSet' ])
			expect(propertyPath).toEqual([ 'colorSettings', 'assignment' ])
		})
	})

	describe('#accessChildPropertyOrCreatePath', () => {
		it('accesses child property if it exists', () => {
			const expectedProperty = {}
			const objectWithProperties = {
				childPathFirstStep: {
					childPathSecondStep: expectedProperty,
				},
			}
			const propertyPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childProperty = codeUtilities.accessChildPropertyOrCreatePath({ objectWithProperties, propertyPath })

			expect(childProperty).toBe(expectedProperty)
		})

		it('creates the path for this setting and sets it to an empty object if it does not exist', () => {
			const objectWithProperties = {}
			const propertyPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childProperty = codeUtilities.accessChildPropertyOrCreatePath({ objectWithProperties, propertyPath })

			expect(childProperty).toEqual({})
			expect(objectWithProperties).toEqual({
				childPathFirstStep: {
					childPathSecondStep: {},
				},
			})
		})

		it('does not override zeroes', () => {
			const objectWithProperties = {
				childPathFirstStep: {
					childPathSecondStep: 0,
				},
			}
			const propertyPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childProperty = codeUtilities.accessChildPropertyOrCreatePath({ objectWithProperties, propertyPath })

			expect(childProperty).toBe(0)
			expect(objectWithProperties).toEqual({
				childPathFirstStep: {
					childPathSecondStep: 0,
				},
			})
		})
	})

	describe('#deepCloneMaybeObject', () => {
		it('deep clones objects', () => {
			expect(codeUtilities.deepCloneMaybeNotObject({ a: { b: { c: 'cba' } } })).toEqual({ a: { b: { c: 'cba' } } })
		})

		it('deep clones arrays', () => {
			expect(codeUtilities.deepCloneMaybeNotObject([ 'a', 'b', 'c' ])).toEqual([ 'a', 'b', 'c' ])
		})

		it('deep clones immutable objects', () => {
			expect(codeUtilities.deepCloneMaybeNotObject('abcba')).toBe('abcba')
		})
	})

	describe('#deepClone', () => {
		let actualObject, originalObject
		beforeEach(() => {
			const anImmutableString = 'a string'
			const anImmutableNumber = 9
			const anImmutableFunction = p => p * 3
			const aNull = null
			const originalArray = [ 'a', 2, { what: 'ever' } ]
			const originalDeepObject = { deeperObject: 'cool beans' }
			const originalShallowObject = { deepObject: originalDeepObject }
			originalObject = {
				anImmutableString,
				anImmutableNumber,
				anImmutableFunction,
				aNull,
				anArray: originalArray,
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

		it('deep clones settings, including nulls', () => {
			expect(actualObject.aNull).toBeNull()
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

	describe('#defaultToTrue', () => {
		let defaultToTrue
		beforeEach(() => defaultToTrue = codeUtilities.defaultToTrue)

		it('returns the setting if it is already defined', () => {
			const setting = { pants: 'pants' }
			expect(defaultToTrue(setting)).toBe(setting)
		})

		it('even returns false if it is defined as false; that is the whole point of this thing', () => {
			expect(defaultToTrue(false)).toBe(false)
		})

		it('returns true if it is not defined', () => {
			expect(defaultToTrue(undefined)).toBe(true)
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

	describe('#propertyIsDefinedOnObject', () => {
		let propertyIsDefinedOnObject
		beforeEach(() => propertyIsDefinedOnObject = codeUtilities.propertyIsDefinedOnObject)

		it('returns true if the setting is defined on the settings', () => {
			const propertyName = 'pants'
			const objectWithProperties = { pants: 'yup' }
			expect(propertyIsDefinedOnObject({ propertyName, objectWithProperties })).toBe(true)
		})

		it('returns true if the setting is defined on the settings, even if it is defined as false', () => {
			const propertyName = 'pants'
			const objectWithProperties = { pants: false }
			expect(propertyIsDefinedOnObject({ propertyName, objectWithProperties })).toBe(true)
		})

		it('returns false if the setting is not defined on the settings', () => {
			const propertyName = 'pants'
			const objectWithProperties = { plants: 'nope' }
			expect(propertyIsDefinedOnObject({ propertyName, objectWithProperties })).toBe(false)
		})
	})

	describe('#changeObjectIntoCopy', () => {
		let changeObjectIntoCopy
		beforeEach(() => changeObjectIntoCopy = codeUtilities.changeObjectIntoCopy)

		it('removes all the keys of the object that are not on the one being copied', () => {
			const objectToChange = { mary: 'jane', billy: 'bob' }
			const objectWithProperties = { }

			changeObjectIntoCopy({ objectToChange, objectWithProperties })
			
			expect(objectToChange.mary).toBe(undefined)
			expect(objectToChange.billy).toBe(undefined)
		})

		it('replaces keys of the object with ones from the one being copied', () => {
			const objectToChange = { mary: 'jane' }
			const objectWithProperties = { mary: 'had a little lamb' }

			changeObjectIntoCopy({ objectToChange, objectWithProperties })
			
			expect(objectToChange.mary).toBe('had a little lamb')
			expect(objectToChange.billy).toBe(undefined)
		})

		it('adds new keys from the one being copied', () => {
			const objectToChange = { }
			const objectWithProperties = { billy: 'bob' }

			changeObjectIntoCopy({ objectToChange, objectWithProperties })
			
			expect(objectToChange.billy).toBe('bob')
		})
	})
})
