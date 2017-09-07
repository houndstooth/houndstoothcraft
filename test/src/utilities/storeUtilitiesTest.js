import storeUtilities from '../../../src/utilities/storeUtilities'
import consoleWrapper from '../../../src/utilities/consoleWrapper'
import codeUtilities from '../../../src/utilities/codeUtilities'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'

describe('store utilities', () => {
	beforeEach(() => resetStore(store))

	describe('#prepareFunctionsPerSetting', () => {
		let actualFunctionsArray, expectedsettingsFunctions, settingsFunctions
		let settingFunction, secondSettingFunction
		beforeEach(() => {
			spyOn(consoleWrapper, 'error')
			settingFunction = p => p * 2
			secondSettingFunction = p => p - 1
			settingsFunctions = {
				childPathFirstStep: {
					childPathSecondStep: {
						childPathFinalStep: settingFunction,
					},
				},
				secondChildPathFirstStep: {
					secondChildPathFinalStep: secondSettingFunction,
					thingThatShouldNotBe: 'Great Old One',
				},
			}
			const settingsPath = undefined
			const functionsArray = undefined

			expectedsettingsFunctions = codeUtilities.deepClone(settingsFunctions)
			actualFunctionsArray = storeUtilities.prepareFunctionsPerSetting({
				settingsFunctions,
				settingsPath,
				functionsArray,
			})
		})

		it('gathers the functions to be applied', () => {
			const expectedFunctionsArray = [
				{
					settingFunctionItself: settingFunction,
					settingsPath: [ 'childPathFirstStep', 'childPathSecondStep' ],
					settingName: 'childPathFinalStep',
				},
				{
					settingFunctionItself: secondSettingFunction,
					settingsPath: [ 'secondChildPathFirstStep' ],
					settingName: 'secondChildPathFinalStep',
				},
			]
			expect(actualFunctionsArray).toEqual(expectedFunctionsArray)
		})

		it('does not modify the settings functions', () => {
			expect(settingsFunctions).toEqual(expectedsettingsFunctions)
		})

		it('errors if you have included anything that is not a function', () => {
			expect(consoleWrapper.error.calls.all()[ 0 ].args[ 0 ]).toContain('secondChildPathFirstStep')
			expect(consoleWrapper.error.calls.all()[ 0 ].args[ 0 ]).toContain('thingThatShouldNotBe')
			expect(consoleWrapper.error.calls.all()[ 0 ].args[ 0 ]).toContain('Great Old One')
		})
	})

	describe('#houndstoothHasOnlyRecognizedPatterns', () => {
		let houndstoothHasOnlyRecognizedPatterns
		const basePattern = {}
		const animationsPattern = {}
		const layersPattern = {}
		const invalidSettings = {}
		beforeEach(() => {
			houndstoothHasOnlyRecognizedPatterns = storeUtilities.houndstoothHasOnlyRecognizedPatterns
		})

		it('returns true even if the pattern contains the name field; that one is okay', () => {
			expect(houndstoothHasOnlyRecognizedPatterns({ name: 'some name' })).toBe(true)
		})

		it('returns true even if the pattern contains only some subset of the recognized settings', () => {
			expect(houndstoothHasOnlyRecognizedPatterns({})).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({ basePattern })).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({ animationsPattern })).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({ layersPattern })).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({ basePattern, animationsPattern })).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({ basePattern, layersPattern })).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({ animationsPattern, layersPattern })).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({
				basePattern,
				animationsPattern,
				layersPattern,
			})).toBe(true)
		})

		it('logs an error if the pattern contains anything other than one of these three recognized patterns, or name', () => {
			spyOn(consoleWrapper, 'error')

			houndstoothHasOnlyRecognizedPatterns({ invalidSettings: {} })

			expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: invalidSettings')
		})

		it('returns false, even if the pattern contains some or all of the three recognized settings in addition to an invalid one', () => {
			spyOn(consoleWrapper, 'error')

			expect(houndstoothHasOnlyRecognizedPatterns({ invalidSettings })).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				basePattern,
			})).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				animationsPattern,
			})).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				layersPattern,
			})).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				basePattern,
				animationsPattern,
			})).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				basePattern,
				layersPattern,
			})).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				animationsPattern,
				layersPattern,
			})).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				basePattern,
				animationsPattern,
				layersPattern,
			})).toBe(false)
		})
	})
})
