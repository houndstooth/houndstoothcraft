import codeUtilities from '../../../src/utilities/codeUtilities'

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
		it('does not mutate the passed settings path', () => {
			const settingsPath = [ 'colorSettings', 'assignment' ]
			const settingName = 'set'

			const deeperPath = codeUtilities.deeperPath({ settingsPath, settingName })

			expect(deeperPath).toEqual([ 'colorSettings', 'assignment', 'set' ])
			expect(settingsPath).toEqual([ 'colorSettings', 'assignment' ])
		})
	})

	describe('#resetObject', () => {
		it('reassigns each of the shallow keys', () => {
			const objectToReset = {
				colorSettings: {
					set: [ 0, 1 ],
				},
				someMode: 'COOLNESS',
			}
			const objectToResetTo = {
				someMode: 'OG_NESS',
				foo: 'bar',
			}

			codeUtilities.resetObject({ objectToReset, objectToResetTo })

			const expectedObject = {
				colorSettings: {
					set: [ 0, 1 ],
				},
				someMode: 'OG_NESS',
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
			const settingsPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childObject = codeUtilities.accessChildObjectOrCreatePath({ parentObject, settingsPath })

			expect(childObject).toBe(expectedObject)
		})

		it('creates the path for this object and sets it to an empty object if it does not exist', () => {
			const parentObject = {}
			const settingsPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childObject = codeUtilities.accessChildObjectOrCreatePath({ parentObject, settingsPath })

			expect(childObject).toEqual({})
			expect(parentObject).toEqual({
				childPathFirstStep: {
					childPathSecondStep: {},
				},
			})
		})

		it('does not override zeroes', () => {
			const parentObject = {
				childPathFirstStep: {
					childPathSecondStep: 0,
				},
			}
			const settingsPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childObject = codeUtilities.accessChildObjectOrCreatePath({ parentObject, settingsPath })

			expect(childObject).toBe(0)
			expect(parentObject).toEqual({
				childPathFirstStep: {
					childPathSecondStep: 0,
				},
			})
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
			const originalDeepSetting = { deeperSetting: 'cool beans' }
			const originalShallowSetting = { deepSetting: originalDeepSetting }
			originalObject = {
				anImmutableString,
				anImmutableNumber,
				anImmutableFunction,
				aNull,
				anArray: originalArray,
				shallowSetting: originalShallowSetting,
			}

			actualObject = codeUtilities.deepClone(originalObject)
		})

		it('deep clones an object, including strings', () => {
			expect(actualObject.anImmutableString).toBe(originalObject.anImmutableString)
		})

		it('deep clones an object, including numbers', () => {
			expect(actualObject.anImmutableNumber).toBe(originalObject.anImmutableNumber)
		})

		it('deep clones an object, including functions', () => {
			expect(actualObject.anImmutableFunction).toBe(originalObject.anImmutableFunction)
		})

		it('deep clones an object, including nulls', () => {
			expect(actualObject.aNull).toBeNull()
		})

		it('deep clones an object, including arrays', () => {
			expect(actualObject.anArray).not.toBe(originalObject.anArray)
			expect(actualObject.anArray).toEqual(originalObject.anArray)
		})

		it('deep clones an object, including shallow objects', () => {
			expect(actualObject.shallowSetting).not.toBe(originalObject.shallowSetting)
			expect(actualObject.shallowSetting).toEqual(originalObject.shallowSetting)
		})

		it('deep clones an object, including deeply nested objects', () => {
			expect(actualObject.shallowSetting.deepSetting).not.toBe(
				originalObject.shallowSetting.deepSetting
			)
			expect(actualObject.shallowSetting.deepSetting).toEqual(
				originalObject.shallowSetting.deepSetting
			)
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

	describe('#settingIsDefinedOnSettings', () => {
		let settingIsDefinedOnSettings
		beforeEach(() => settingIsDefinedOnSettings = codeUtilities.settingIsDefinedOnSettings)

		it('returns true if the setting is defined on the settings', () => {
			const settingName = 'pants'
			const settingsMaybeWithSetting = { pants: 'yup' }
			expect(settingIsDefinedOnSettings({ settingName, settingsMaybeWithSetting })).toBe(true)
		})

		it('returns true if the setting is defined on the settings, even if it is defined as false', () => {
			const settingName = 'pants'
			const settingsMaybeWithSetting = { pants: false }
			expect(settingIsDefinedOnSettings({ settingName, settingsMaybeWithSetting })).toBe(true)
		})

		it('returns false if the setting is not defined on the settings', () => {
			const settingName = 'pants'
			const settingsMaybeWithSetting = { plants: 'nope' }
			expect(settingIsDefinedOnSettings({ settingName, settingsMaybeWithSetting })).toBe(false)
		})
	})
})
