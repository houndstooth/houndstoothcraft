import settingsUtilities from '../../../src/utilities/settingsUtilities'
import consoleWrapper from '../../../src/application/consoleWrapper'
import codeUtilities from '../../../src/utilities/codeUtilities'
import defaultSettings from '../../../src/settings/defaultSettings'

describe('settings utilities', () => {
	describe('#prepareFunctionsPerSettingsProperty', () => {
		let actualFunctionsArray, expectedObjectWithFunctions, objectWithFunctions
		let propertyFunction, secondPropertyFunction
		beforeEach(() => {
			spyOn(consoleWrapper, 'error')
			propertyFunction = p => p * 2
			secondPropertyFunction = p => p - 1
			objectWithFunctions = {
				childPathFirstStep: {
					childPathSecondStep: {
						childPathFinalStep: propertyFunction,
					},
				},
				secondChildPathFirstStep: {
					secondChildPathFinalStep: secondPropertyFunction,
					thingThatShouldNotBe: 'Great Old One',
				},
			}
			const nestedPropertyPath = undefined
			const functionsArray = undefined

			expectedObjectWithFunctions = codeUtilities.deepClone(objectWithFunctions)
			actualFunctionsArray = settingsUtilities.prepareFunctionsPerSettingsProperty({
				objectWithFunctions,
				nestedPropertyPath,
				functionsArray,
			})
		})

		it('gathers the functions to be applied', () => {
			const expectedFunctionsArray = [
				{
					fn: propertyFunction,
					nestedPropertyPath: [ 'childPathFirstStep', 'childPathSecondStep' ],
					propertyName: 'childPathFinalStep',
				},
				{
					fn: secondPropertyFunction,
					nestedPropertyPath: [ 'secondChildPathFirstStep' ],
					propertyName: 'secondChildPathFinalStep',
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
		it('changes and adds properties to the object with properties to be overridden, from the object with property overrides which as matching structure', () => {
			const objectWithPropertiesToBeOverridden = {
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
			const objectWithPropertyOverrides = {
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
				objectWithPropertiesToBeOverridden,
				objectWithPropertyOverrides,
			})

			const expectedObjectWithPropertiesOverriden = {
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
			expect(expectedObjectWithPropertiesOverriden).toEqual(objectWithPropertiesToBeOverridden)
		})

		it('errors when attempting to add a property that is not registered in the settings shape, and does not add it', () => {
			spyOn(consoleWrapper, 'error')
			const objectWithPropertiesToBeOverridden = {}
			const objectWithPropertyOverrides = {
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
				objectWithPropertiesToBeOverridden,
				objectWithPropertyOverrides,
			})

			const expectedObjectWithPropertiesOverriden = {}
			expect(expectedObjectWithPropertiesOverriden).toEqual(objectWithPropertiesToBeOverridden)
			expect(consoleWrapper.error).toHaveBeenCalledWith(
				'Attempt to apply unknown settings: colorSettings.assignment.probablyAnAccident'
			)
		})
	})

	describe('#getFromSettingsOrDefault', () => {
		let getFromSettingsOrDefault
		beforeEach(() => getFromSettingsOrDefault = settingsUtilities.getFromSettingsOrDefault)

		it('gets the property from settings if it is defined', () => {
			currentState.settings.animations = { specialMoves: { youKnowIt: 'awesome' } }
			defaultSettings.animations = { specialMoves: { youKnowIt: 'will not matter' } }

			const nestedPropertyPath = [ 'animations', 'specialMoves', 'youKnowIt' ]
			expect(getFromSettingsOrDefault(nestedPropertyPath)).toBe('awesome')
		})

		it('gets the property from settings even if it is zero; that is the whole point of this thing', () => {
			currentState.settings.animations = { specialMoves: { youKnowIt: 0 } }
			defaultSettings.animations = { specialMoves: { youKnowIt: 'will not matter' } }

			const nestedPropertyPath = [ 'animations', 'specialMoves', 'youKnowIt' ]
			expect(getFromSettingsOrDefault(nestedPropertyPath)).toBe(0)
		})

		it('defaults the property if it is not defined', () => {
			defaultSettings.animations = { specialMoves: { youKnowIt: 'defawesome' } }

			const nestedPropertyPath = [ 'animations', 'specialMoves', 'youKnowIt' ]
			expect(getFromSettingsOrDefault(nestedPropertyPath)).toBe('defawesome')
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
