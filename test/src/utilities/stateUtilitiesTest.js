import stateUtilities from '../../../src/utilities/stateUtilities'
import consoleWrapper from '../../../src/application/consoleWrapper'
import codeUtilities from '../../../src/utilities/codeUtilities'
import patternDefaults from '../../../src/state/patternDefaults'
import store from '../../../store'
import initialState from '../../../src/state/initialState'

describe('state utilities', () => {
	beforeEach(() => {
		store.currentState = codeUtilities.deepClone(initialState.INITIAL_STATE)
	})

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
			actualFunctionsArray = stateUtilities.prepareFunctionsPerSetting({
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

	describe('#mergeSettings', () => {
		it('changes and adds settings to the settings with settings to be overridden, from the settings with setting overrides which has a matching structure', () => {
			const settingsToBeMergedOnto = {
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
			const settingsToMerge = {
				colorSettings: {
					assignment: {
						assignmentMode: 'luke',
					},
				},
				gridSettings: {
					gridSize: 'sith',
				},
			}

			stateUtilities.mergeSettings({
				settingsToBeMergedOnto,
				settingsToMerge,
			})

			const expectedSettingsWithSettingsOverridden = {
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
			expect(expectedSettingsWithSettingsOverridden).toEqual(settingsToBeMergedOnto)
		})

		it('errors when attempting to add a setting that is not recognized in the pattern structure, and does not add it', () => {
			spyOn(consoleWrapper, 'error')
			const settingsToBeMergedOnto = {}
			const settingsToMerge = {
				colorSettings: {
					assignment: {
						probablyAnAccident: {
							assignmentMode: 'yoda',
							switcheroo: 'death star',
						},
					},
				},
			}

			stateUtilities.mergeSettings({
				settingsToBeMergedOnto,
				settingsToMerge,
			})

			const expectedSettingsWithSettingsOverridden = {}
			expect(expectedSettingsWithSettingsOverridden).toEqual(settingsToBeMergedOnto)
			expect(consoleWrapper.error).toHaveBeenCalledWith(
				'Attempted to add a setting to the pattern which is unrecognized in the pattern structure: colorSettings.assignment.probablyAnAccident'
			)
		})
	})

	describe('#getFromBuiltPatternOrDefault', () => {
		let getFromBuiltPatternOrDefault
		beforeEach(() => getFromBuiltPatternOrDefault = stateUtilities.getFromBuiltPatternOrDefault)

		it('gets the setting from settings if it is defined', () => {
			store.currentState.builtPattern.animations = { specialMoves: { youKnowIt: 'awesome' } }
			patternDefaults.animations = { specialMoves: { youKnowIt: 'will not matter' } }

			const settingsPath = [ 'animations', 'specialMoves', 'youKnowIt' ]
			expect(getFromBuiltPatternOrDefault(settingsPath)).toBe('awesome')
		})

		it('gets the setting from settings even if it is zero; that is the whole point of this thing', () => {
			store.currentState.builtPattern.animations = { specialMoves: { youKnowIt: 0 } }
			patternDefaults.animations = { specialMoves: { youKnowIt: 'will not matter' } }

			const settingsPath = [ 'animations', 'specialMoves', 'youKnowIt' ]
			expect(getFromBuiltPatternOrDefault(settingsPath)).toBe(0)
		})

		it('defaults the setting if it is not defined', () => {
			patternDefaults.animations = { specialMoves: { youKnowIt: 'defawesome' } }

			const settingsPath = [ 'animations', 'specialMoves', 'youKnowIt' ]
			expect(getFromBuiltPatternOrDefault(settingsPath)).toBe('defawesome')
		})
	})

	describe('#confirmPatternHasNoNonSettings', () => {
		let confirmPatternHasNoNonSettings
		const base = {}
		const animations = {}
		const iterations = {}
		const invalidSettings = {}
		beforeEach(() => {
			confirmPatternHasNoNonSettings = stateUtilities.confirmPatternHasNoNonSettings
		})

		it('returns true if the pattern contains only some subset of the recognized settings', () => {
			expect(confirmPatternHasNoNonSettings({})).toBe(true)
			expect(confirmPatternHasNoNonSettings({ base })).toBe(true)
			expect(confirmPatternHasNoNonSettings({ animations })).toBe(true)
			expect(confirmPatternHasNoNonSettings({ iterations })).toBe(true)
			expect(confirmPatternHasNoNonSettings({ base, animations })).toBe(true)
			expect(confirmPatternHasNoNonSettings({ base, iterations })).toBe(true)
			expect(confirmPatternHasNoNonSettings({ animations, iterations })).toBe(true)
			expect(confirmPatternHasNoNonSettings({
				base,
				animations,
				iterations,
			})).toBe(true)
		})

		it('logs an error if the pattern contains anything other than one of these three recognized settings', () => {
			spyOn(consoleWrapper, 'error')

			confirmPatternHasNoNonSettings({ invalidSettings: {} })

			expect(consoleWrapper.error).toHaveBeenCalledWith('Attempted to add unrecognized settings to pattern: invalidSettings')
		})

		it('returns false, even if the pattern contains some or all of the three recognized settings in addition to an invalid one', () => {
			spyOn(consoleWrapper, 'error')

			expect(confirmPatternHasNoNonSettings({ invalidSettings })).toBe(false)
			expect(confirmPatternHasNoNonSettings({
				invalidSettings,
				base,
			})).toBe(false)
			expect(confirmPatternHasNoNonSettings({
				invalidSettings,
				animations,
			})).toBe(false)
			expect(confirmPatternHasNoNonSettings({
				invalidSettings,
				iterations,
			})).toBe(false)
			expect(confirmPatternHasNoNonSettings({
				invalidSettings,
				base,
				animations,
			})).toBe(false)
			expect(confirmPatternHasNoNonSettings({
				invalidSettings,
				base,
				iterations,
			})).toBe(false)
			expect(confirmPatternHasNoNonSettings({
				invalidSettings,
				animations,
				iterations,
			})).toBe(false)
			expect(confirmPatternHasNoNonSettings({
				invalidSettings,
				base,
				animations,
				iterations,
			})).toBe(false)
		})
	})
})
