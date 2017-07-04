import settingsUtilities from '../../../src/utilities/settingsUtilities'
import consoleWrapper from '../../../src/application/consoleWrapper'
import codeUtilities from '../../../src/utilities/codeUtilities'

describe('settings utilities', () => {
	describe('#prepareFunctionsPerSettingsProperty', () => {
		let actualFunctionsArray, expectedObjectWithFunctions, objectWithFunctions
		let propertyFunction, secondPropertyFunction
		beforeEach(() => {
			spyOn(consoleWrapper, 'warn')
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

		it('warns you if you have included anything that is not a function', () => {
			expect(consoleWrapper.warn.calls.all()[ 0 ].args[ 0 ]).toContain('secondChildPathFirstStep')
			expect(consoleWrapper.warn.calls.all()[ 0 ].args[ 0 ]).toContain('thingThatShouldNotBe')
			expect(consoleWrapper.warn.calls.all()[ 0 ].args[ 0 ]).toContain('Great Old One')
		})
	})

	describe('#applyOverrides', () => {
		it('changes and adds properties to the object with properties to be overridden, from the object with property overrides which as matching structure', () => {
			const objectWithPropertiesToBeOverridden = {
				propertyObjectOne: {
					nestedPropertyObjectOneOne: {
						property: 'yoda',
						anotherProperty: 'death star',
					},
				},
				propertyObjectTwo: {
					property: 'jedi',
				},
			}
			const objectWithPropertyOverrides = {
				propertyObjectOne: {
					nestedPropertyObjectOneOne: {
						property: 'luke',
					},
				},
				propertyObjectTwo: {
					property: 'sith',
				},
			}

			settingsUtilities.applyOverrides({
				objectWithPropertiesToBeOverridden,
				objectWithPropertyOverrides,
			})

			const expectedObjectWithPropertiesOverriden =  {
				propertyObjectOne: {
					nestedPropertyObjectOneOne: {
						property: 'luke',
						anotherProperty: 'death star',
					},
				},
				propertyObjectTwo: {
					property: 'sith',
				},
			}
			expect(expectedObjectWithPropertiesOverriden).toEqual(objectWithPropertiesToBeOverridden)
		})
	})
})
