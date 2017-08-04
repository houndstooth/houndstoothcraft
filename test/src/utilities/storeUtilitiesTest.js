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

		describe('warning about conflicts', () => {
			beforeEach(() => spyOn(consoleWrapper, 'warn'))

			it('warns when requested and there are conflicts', () => {
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

				storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

				const expectedWarningOne = 'some effects have conflicts on setting: colorSettings.assignment.assignmentMode'
				const expectedWarningTwo = 'some effects have conflicts on setting: gridSettings.gridSize'
				expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarningOne)
				expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarningTwo)
			})

			it('does not warn when not requested', () => {
				const patternToBeMergedOnto = { gridSettings: { gridSize: 'jedi' } }
				const patternToMerge = { gridSettings: { gridSize: 'sith' } }

				storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge })

				expect(consoleWrapper.warn).not.toHaveBeenCalled()
			})

			it('does not warn when there are no conflicts', () => {
				const patternToBeMergedOnto = {
					colorSettings: {
						assignment: {
							assignmentMode: 'yoda',
							switcheroo: 'death star',
						},
					},
				}
				const patternToMerge = {
					colorSettings: {
						assignment: {
							flipGrain: 'luke',
						},
					},
				}

				storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

				expect(consoleWrapper.warn).not.toHaveBeenCalled()
			})

			it('does not warn when the settings conflict but are the same', () => {
				const patternToBeMergedOnto = { gridSettings: { gridSize: 'sith' } }
				const patternToMerge = { gridSettings: { gridSize: 'sith' } }

				storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

				expect(consoleWrapper.warn).not.toHaveBeenCalled()
			})
		})
	})

	describe('#houndstoothHasOnlyRecognizedPatterns', () => {
		let houndstoothHasOnlyRecognizedPatterns
		const basePattern = {}
		const animationsPattern = {}
		const iterationsPattern = {}
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
			expect(houndstoothHasOnlyRecognizedPatterns({ iterationsPattern })).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({ basePattern, animationsPattern })).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({ basePattern, iterationsPattern })).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({ animationsPattern, iterationsPattern })).toBe(true)
			expect(houndstoothHasOnlyRecognizedPatterns({
				basePattern,
				animationsPattern,
				iterationsPattern,
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
				iterationsPattern,
			})).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				basePattern,
				animationsPattern,
			})).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				basePattern,
				iterationsPattern,
			})).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				animationsPattern,
				iterationsPattern,
			})).toBe(false)
			expect(houndstoothHasOnlyRecognizedPatterns({
				invalidSettings,
				basePattern,
				animationsPattern,
				iterationsPattern,
			})).toBe(false)
		})
	})
})
