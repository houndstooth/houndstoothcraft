import settingsUtilities from '../../../src/utilities/settingsUtilities'
import consoleWrapper from '../../../src/application/consoleWrapper'
import codeUtilities from '../../../src/utilities/codeUtilities'
import defaultSettings from '../../../src/settings/defaultSettings'

describe('settings utilities', () => {
	describe('#prepareFunctionsPerSetting', () => {
		let actualFunctionsArray, expectedObjectWithFunctions, objectWithFunctions
		let settingFunction, secondSettingFunction
		beforeEach(() => {
			spyOn(consoleWrapper, 'error')
			settingFunction = p => p * 2
			secondSettingFunction = p => p - 1
			objectWithFunctions = {
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

			expectedObjectWithFunctions = codeUtilities.deepClone(objectWithFunctions)
			actualFunctionsArray = settingsUtilities.prepareFunctionsPerSetting({
				objectWithFunctions,
				settingsPath,
				functionsArray,
			})
		})

		it('gathers the functions to be applied', () => {
			const expectedFunctionsArray = [
				{
					fn: settingFunction,
					settingsPath: [ 'childPathFirstStep', 'childPathSecondStep' ],
					settingName: 'childPathFinalStep',
				},
				{
					fn: secondSettingFunction,
					settingsPath: [ 'secondChildPathFirstStep' ],
					settingName: 'secondChildPathFinalStep',
				},
			]
			expect(actualFunctionsArray).toEqual(expectedFunctionsArray)
		})

		it('does not modify the object it gets the functions from', () => {
			expect(objectWithFunctions).toEqual(expectedObjectWithFunctions)
		})

		it('errors if you have included anything that is not a function', () => {
			expect(consoleWrapper.error.calls.all()[ 0 ].args[ 0 ]).toContain('secondChildPathFirstStep')
			expect(consoleWrapper.error.calls.all()[ 0 ].args[ 0 ]).toContain('thingThatShouldNotBe')
			expect(consoleWrapper.error.calls.all()[ 0 ].args[ 0 ]).toContain('Great Old One')
		})
	})

	describe('#applyOverrides', () => {
		it('changes and adds settings to the settings with settings to be overridden, from the settings with setting overrides which has a matching structure', () => {
			const settingsWithSettingsToBeOverridden = {
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
			const settingsWithSettingsOverrides = {
				colorSettings: {
					assignment: {
						assignmentMode: 'luke',
					},
				},
				gridSettings: {
					gridSize: 'sith',
				},
			}

			settingsUtilities.applyOverrides({
				settingsWithSettingsToBeOverridden,
				settingsWithSettingsOverrides,
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
			expect(expectedSettingsWithSettingsOverridden).toEqual(settingsWithSettingsToBeOverridden)
		})

		it('errors when attempting to add a setting that is not registered as a houndstooth setting, and does not add it', () => {
			spyOn(consoleWrapper, 'error')
			const settingsWithSettingsToBeOverridden = {}
			const settingsWithSettingsOverrides = {
				colorSettings: {
					assignment: {
						probablyAnAccident: {
							assignmentMode: 'yoda',
							switcheroo: 'death star',
						},
					},
				},
			}

			settingsUtilities.applyOverrides({
				settingsWithSettingsToBeOverridden,
				settingsWithSettingsOverrides,
			})

			const expectedSettingsWithSettingsOverridden = {}
			expect(expectedSettingsWithSettingsOverridden).toEqual(settingsWithSettingsToBeOverridden)
			expect(consoleWrapper.error).toHaveBeenCalledWith(
				'Attempt to apply unknown settings: colorSettings.assignment.probablyAnAccident'
			)
		})
	})

	describe('#getFromSettingsOrDefault', () => {
		let getFromSettingsOrDefault
		beforeEach(() => getFromSettingsOrDefault = settingsUtilities.getFromSettingsOrDefault)

		it('gets the setting from settings if it is defined', () => {
			currentState.settings.animations = { specialMoves: { youKnowIt: 'awesome' } }
			defaultSettings.animations = { specialMoves: { youKnowIt: 'will not matter' } }

			const settingsPath = [ 'animations', 'specialMoves', 'youKnowIt' ]
			expect(getFromSettingsOrDefault(settingsPath)).toBe('awesome')
		})

		it('gets the setting from settings even if it is zero; that is the whole point of this thing', () => {
			currentState.settings.animations = { specialMoves: { youKnowIt: 0 } }
			defaultSettings.animations = { specialMoves: { youKnowIt: 'will not matter' } }

			const settingsPath = [ 'animations', 'specialMoves', 'youKnowIt' ]
			expect(getFromSettingsOrDefault(settingsPath)).toBe(0)
		})

		it('defaults the setting if it is not defined', () => {
			defaultSettings.animations = { specialMoves: { youKnowIt: 'defawesome' } }

			const settingsPath = [ 'animations', 'specialMoves', 'youKnowIt' ]
			expect(getFromSettingsOrDefault(settingsPath)).toBe('defawesome')
		})
	})

	describe('#confirmSettingsObjectsParentIncludesOnlySettingsObjects', () => {
		let confirmSettingsObjectsParentIncludesOnlySettingsObjects
		const base = {}
		const animations = {}
		const iterations = {}
		const anInvalidSettingsObject = {}
		beforeEach(() => {
			confirmSettingsObjectsParentIncludesOnlySettingsObjects = settingsUtilities.confirmSettingsObjectsParentIncludesOnlySettingsObjects
		})

		it('returns true if the object contains only some subset of iterations, animations, and base settings objects', () => {
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({})).toBe(true)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({ base })).toBe(true)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({ animations })).toBe(true)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({ iterations })).toBe(true)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({ base, animations })).toBe(true)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({ base, iterations })).toBe(true)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({ animations, iterations })).toBe(true)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({
				base,
				animations,
				iterations,
			})).toBe(true)
		})

		it('logs an error if the object contains anything other than one of these three settings objects', () => {
			spyOn(consoleWrapper, 'error')

			confirmSettingsObjectsParentIncludesOnlySettingsObjects({ anInvalidSettingsObject: {} })

			expect(consoleWrapper.error).toHaveBeenCalledWith('Unknown settings object: anInvalidSettingsObject')
		})

		it('returns false, even if the object contains some or all of the three settings objects in addition to an invalid one', () => {
			spyOn(consoleWrapper, 'error')

			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({ anInvalidSettingsObject })).toBe(false)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({
				anInvalidSettingsObject,
				base,
			})).toBe(false)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({
				anInvalidSettingsObject,
				animations,
			})).toBe(false)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({
				anInvalidSettingsObject,
				iterations,
			})).toBe(false)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({
				anInvalidSettingsObject,
				base,
				animations,
			})).toBe(false)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({
				anInvalidSettingsObject,
				base,
				iterations,
			})).toBe(false)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({
				anInvalidSettingsObject,
				animations,
				iterations,
			})).toBe(false)
			expect(confirmSettingsObjectsParentIncludesOnlySettingsObjects({
				anInvalidSettingsObject,
				base,
				animations,
				iterations,
			})).toBe(false)
		})
	})
})
