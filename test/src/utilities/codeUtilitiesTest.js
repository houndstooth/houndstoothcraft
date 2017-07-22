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

		it('returns true if two settings have identical key value pairs', () => {
			const a = { r: 5, a: 0 }
			const b = { r: 5, a: 0 }
			expect(shallowEqual(a, b)).toBe(true)
		})

		it('returns false if two settings have different key counts', () => {
			const a = { r: 5, a: 0 }
			const b = { r: 5, a: 0, yo: 'foo' }
			expect(shallowEqual(a, b)).toBe(false)
		})

		it('returns false if two settings have different values for a key', () => {
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

	describe('#resetSettings', () => {
		it('reassigns each of the shallow keys', () => {
			const settingsToReset = {
				colorSettings: {
					set: [ 0, 1 ],
				},
				someMode: 'COOLNESS',
			}
			const settingsToResetTo = {
				someMode: 'OG_NESS',
				foo: 'bar',
			}

			codeUtilities.resetSettings({ settingsToReset, settingsToResetTo })

			const expectedSettings = {
				colorSettings: {
					set: [ 0, 1 ],
				},
				someMode: 'OG_NESS',
				foo: 'bar',
			}
			expect(settingsToReset).toEqual(expectedSettings)
		})
	})

	describe('#accessChildSettingOrCreatePath', () => {
		it('accesses child setting if it exists', () => {
			const expectedSettings = {}
			const settingsRoot = {
				childPathFirstStep: {
					childPathSecondStep: expectedSettings,
				},
			}
			const settingsPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childSetting = codeUtilities.accessChildSettingOrCreatePath({ settingsRoot, settingsPath })

			expect(childSetting).toBe(expectedSettings)
		})

		it('creates the path for this setting and sets it to an empty object if it does not exist', () => {
			const settingsRoot = {}
			const settingsPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childSetting = codeUtilities.accessChildSettingOrCreatePath({ settingsRoot, settingsPath })

			expect(childSetting).toEqual({})
			expect(settingsRoot).toEqual({
				childPathFirstStep: {
					childPathSecondStep: {},
				},
			})
		})

		it('does not override zeroes', () => {
			const settingsRoot = {
				childPathFirstStep: {
					childPathSecondStep: 0,
				},
			}
			const settingsPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childSetting = codeUtilities.accessChildSettingOrCreatePath({ settingsRoot, settingsPath })

			expect(childSetting).toBe(0)
			expect(settingsRoot).toEqual({
				childPathFirstStep: {
					childPathSecondStep: 0,
				},
			})
		})
	})

	describe('#deepClone', () => {
		let actualSettings, originalSettings
		beforeEach(() => {
			const anImmutableString = 'a string'
			const anImmutableNumber = 9
			const anImmutableFunction = p => p * 3
			const aNull = null
			const originalArray = [ 'a', 2, { what: 'ever' } ]
			const originalDeepSetting = { deeperSetting: 'cool beans' }
			const originalShallowSetting = { deepSetting: originalDeepSetting }
			originalSettings = {
				anImmutableString,
				anImmutableNumber,
				anImmutableFunction,
				aNull,
				anArray: originalArray,
				shallowSetting: originalShallowSetting,
			}

			actualSettings = codeUtilities.deepClone(originalSettings)
		})

		it('deep clones settings, including strings', () => {
			expect(actualSettings.anImmutableString).toBe(originalSettings.anImmutableString)
		})

		it('deep clones settings, including numbers', () => {
			expect(actualSettings.anImmutableNumber).toBe(originalSettings.anImmutableNumber)
		})

		it('deep clones settings, including functions', () => {
			expect(actualSettings.anImmutableFunction).toBe(originalSettings.anImmutableFunction)
		})

		it('deep clones settings, including nulls', () => {
			expect(actualSettings.aNull).toBeNull()
		})

		it('deep clones settings, including arrays', () => {
			expect(actualSettings.anArray).not.toBe(originalSettings.anArray)
			expect(actualSettings.anArray).toEqual(originalSettings.anArray)
		})

		it('deep clones settings, including shallow settings', () => {
			expect(actualSettings.shallowSetting).not.toBe(originalSettings.shallowSetting)
			expect(actualSettings.shallowSetting).toEqual(originalSettings.shallowSetting)
		})

		it('deep clones settings, including deeply nested settings', () => {
			expect(actualSettings.shallowSetting.deepSetting).not.toBe(
				originalSettings.shallowSetting.deepSetting
			)
			expect(actualSettings.shallowSetting.deepSetting).toEqual(
				originalSettings.shallowSetting.deepSetting
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
