import storeUtilities from '../../../src/utilities/storeUtilities'
import consoleWrapper from '../../../src/application/consoleWrapper'
import codeUtilities from '../../../src/utilities/codeUtilities'
import store from '../../../store'
import resetStore from '../../helpers/resetStore'

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

	describe('#composePatterns', () => {
		it('merges one pattern onto the other', () => {
			const patternToBeMergedOnto = {
				colorSettings: {
					assignment: {
						assignmentMode: 'yoda',
						switcheroo: 'death star',
					},
				},
				gridSettings: {
					gridSize: 'jedi',
				},
			}
			const patternToMerge = {
				colorSettings: {
					assignment: {
						assignmentMode: 'luke',
					},
				},
				gridSettings: {
					gridSize: 'sith',
				},
			}

			storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge })

			const expectedPattern = {
				colorSettings: {
					assignment: {
						assignmentMode: 'luke',
						switcheroo: 'death star',
					},
				},
				gridSettings: {
					gridSize: 'sith',
				},
			}
			expect(expectedPattern).toEqual(patternToBeMergedOnto)
		})

		it('errors when it notices that a setting being merged onto the pattern does not fit into the pattern structure, and then does not merge it', () => {
			spyOn(consoleWrapper, 'error')
			const patternToBeMergedOnto = {}
			const patternToMerge = {
				colorSettings: {
					assignment: {
						probablyAnAccident: {
							assignmentMode: 'yoda',
							switcheroo: 'death star',
						},
					},
				},
			}

			storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge })

			const expectedPattern = {}
			expect(expectedPattern).toEqual(patternToBeMergedOnto)
			expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a pattern with an unrecognized setting: colorSettings.assignment.probablyAnAccident')
		})
	})

	describe('#confirmHoundstoothHasNoUnrecognizedPatterns', () => {
		let confirmHoundstoothHasNoUnrecognizedPatterns
		const basePattern = {}
		const animationsPattern = {}
		const iterationsPattern = {}
		const invalidSettings = {}
		beforeEach(() => {
			confirmHoundstoothHasNoUnrecognizedPatterns = storeUtilities.confirmHoundstoothHasNoUnrecognizedPatterns
		})

		it('returns true if the pattern contains the name field', () => {
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({ name: 'some name' })).toBe(true)
		})

		it('returns true if the pattern contains only some subset of the recognized settings', () => {
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({})).toBe(true)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({ basePattern })).toBe(true)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({ animationsPattern })).toBe(true)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({ iterationsPattern })).toBe(true)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({ basePattern, animationsPattern })).toBe(true)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({ basePattern, iterationsPattern })).toBe(true)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({ animationsPattern, iterationsPattern })).toBe(true)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({
				basePattern,
				animationsPattern,
				iterationsPattern,
			})).toBe(true)
		})

		it('logs an error if the pattern contains anything other than one of these three recognized patterns, or name', () => {
			spyOn(consoleWrapper, 'error')

			confirmHoundstoothHasNoUnrecognizedPatterns({ invalidSettings: {} })

			expect(consoleWrapper.error).toHaveBeenCalledWith('attempted to compose a houndstooth with an unrecognized pattern: invalidSettings')
		})

		it('returns false, even if the pattern contains some or all of the three recognized settings in addition to an invalid one', () => {
			spyOn(consoleWrapper, 'error')

			expect(confirmHoundstoothHasNoUnrecognizedPatterns({ invalidSettings })).toBe(false)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({
				invalidSettings,
				basePattern,
			})).toBe(false)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({
				invalidSettings,
				animationsPattern,
			})).toBe(false)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({
				invalidSettings,
				iterationsPattern,
			})).toBe(false)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({
				invalidSettings,
				basePattern,
				animationsPattern,
			})).toBe(false)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({
				invalidSettings,
				basePattern,
				iterationsPattern,
			})).toBe(false)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({
				invalidSettings,
				animationsPattern,
				iterationsPattern,
			})).toBe(false)
			expect(confirmHoundstoothHasNoUnrecognizedPatterns({
				invalidSettings,
				basePattern,
				animationsPattern,
				iterationsPattern,
			})).toBe(false)
		})
	})
})
