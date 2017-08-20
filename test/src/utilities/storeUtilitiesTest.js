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
			let warnSpy
			beforeEach(() => {
				spyOn(consoleWrapper, 'warn')
				warnSpy = jasmine.createSpy()
				storeUtilities.__Rewire__('warn', warnSpy)
			})

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

				const expectedWarningOne = 'some effects have conflicts on setting `colorSettings.assignment.assignmentMode`: `yoda` was overridden by `luke`'
				const expectedWarningTwo = 'some effects have conflicts on setting `gridSettings.gridSize`: `jedi` was overridden by `sith`'
				expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarningOne)
				expect(warnSpy).toHaveBeenCalledWith(expectedWarningOne)
				expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarningTwo)
				expect(warnSpy).toHaveBeenCalledWith(expectedWarningTwo)
			})

			it('does not warn when not requested', () => {
				const patternToBeMergedOnto = { gridSettings: { gridSize: 'jedi' } }
				const patternToMerge = { gridSettings: { gridSize: 'sith' } }

				storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge })

				expect(consoleWrapper.warn).not.toHaveBeenCalled()
				expect(warnSpy).not.toHaveBeenCalled()
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
				expect(warnSpy).not.toHaveBeenCalled()
			})

			it('does not warn when the settings conflict but are the same', () => {
				const patternToBeMergedOnto = { gridSettings: { gridSize: 'sith' } }
				const patternToMerge = { gridSettings: { gridSize: 'sith' } }

				storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

				expect(consoleWrapper.warn).not.toHaveBeenCalled()
				expect(warnSpy).not.toHaveBeenCalled()
			})

			it('does not warn when the functions are equal', () => {
				const patternToBeMergedOnto = { tileSettings: { getTileOriginAndSize: a => a + 1 } }
				const patternToMerge = { tileSettings: { getTileOriginAndSize: a => a + 1 } }

				storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

				expect(consoleWrapper.warn).not.toHaveBeenCalled()
				expect(warnSpy).not.toHaveBeenCalled()
			})

			it('does warn when the functions are not equal', () => {
				const patternToBeMergedOnto = { tileSettings: { getTileOriginAndSize: a => a + 1 } }
				const patternToMerge = { tileSettings: { getTileOriginAndSize: b => b + 1 } }

				storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

				const expectedWarning = 'some effects have conflicts on setting `tileSettings.getTileOriginAndSize`: `function getTileOriginAndSize(a) {return a + 1;}` was overridden by `function getTileOriginAndSize(b) {return b + 1;}`'
				expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
				expect(warnSpy).toHaveBeenCalledWith(expectedWarning)
			})

			it('does not warn when arrays are equal', () => {
				const patternToBeMergedOnto = { colorSettings: { backgroundColor: [ 'a', 'b' ] } }
				const patternToMerge = { colorSettings: { backgroundColor: [ 'a', 'b' ] } }

				storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

				expect(consoleWrapper.warn).not.toHaveBeenCalled()
				expect(warnSpy).not.toHaveBeenCalled()
			})

			it('does warn when arrays are not equal', () => {
				const patternToBeMergedOnto = { colorSettings: { backgroundColor: [ 'a', 'b' ] } }
				const patternToMerge = { colorSettings: { backgroundColor: [ 'b', 'a' ] } }

				storeUtilities.composePatterns({ patternToBeMergedOnto, patternToMerge, warnAboutConflicts: true })

				const expectedWarning = 'some effects have conflicts on setting `colorSettings.backgroundColor`: `[ a, b ]` was overridden by `[ b, a ]`'
				expect(consoleWrapper.warn).toHaveBeenCalledWith(expectedWarning)
				expect(warnSpy).toHaveBeenCalledWith(expectedWarning)
			})
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
