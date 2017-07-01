import applicationUtilities from '../../src/utilities/applicationUtilities'
import consoleWrapper from '../../src/application/consoleWrapper'

describe('application utilities', () => {
	describe('deeper path', () => {
		it('does not mutate the passed property path', () => {
			const nestedPropertyPath = [ 'colorConfig', 'assignment' ]
			const propertyName = 'set'

			const deeperPath = applicationUtilities.deeperPath({ nestedPropertyPath, propertyName })

			expect(deeperPath).toEqual([ 'colorConfig', 'assignment', 'set' ])
			expect(nestedPropertyPath).toEqual([ 'colorConfig', 'assignment' ])
		})
	})

	describe('reset object', () => {
		it('reassigns each of the immediate keys', () => {
			const objectToReset = {
				colorConfig: {
					set: [ 0, 1 ],
				},
				mode: 'COOLNESS',
			}
			const objectToResetTo = {
				mode: 'OG_NESS',
				foo: 'bar',
			}

			applicationUtilities.resetObject({ objectToReset, objectToResetTo })

			const expectedObject = {
				colorConfig: {
					set: [ 0, 1 ],
				},
				mode: 'OG_NESS',
				foo: 'bar',
			}
			expect(objectToReset).toEqual(expectedObject)
		})
	})

	describe('accessChildObjectOrCreatePath', () => {
		it('accesses child object if it exists', () => {
			const expectedObject = {}
			const parentObject = {
				childPathFirstStep: {
					childPathSecondStep: expectedObject,
				},
			}
			const nestedPropertyPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childObject = applicationUtilities.accessChildObjectOrCreatePath({ parentObject, nestedPropertyPath })

			expect(childObject).toBe(expectedObject)
		})

		it('creates the path for this object and sets it to an empty object if it does not exist', () => {
			const parentObject = {}
			const nestedPropertyPath = [ 'childPathFirstStep', 'childPathSecondStep' ]

			const childObject = applicationUtilities.accessChildObjectOrCreatePath({ parentObject, nestedPropertyPath })

			expect(childObject).toEqual({})
			expect(parentObject).toEqual({
				childPathFirstStep: {
					childPathSecondStep: {},
				},
			})
		})
	})

	describe('deepClone', () => {
		it('deep clones an object, including functions', () => {
			const anImmutableString = 'a string'
			const anImmutableNumber = 9
			const anImmutableFunction = p => p * 3
			const originalArray = [ 'a', 2, { what: 'ever' } ]
			const originalDeepNestedObject = { deepNestedProperty: 'cool beans' }
			const originalImmediateNestedObject = { deepNestedObject: originalDeepNestedObject }
			const originalObject = {
				anImmutableString,
				anImmutableNumber,
				anImmutableFunction,
				anArray: originalArray,
				immediateNestedObject: originalImmediateNestedObject,
			}

			const actualObject = applicationUtilities.deepClone(originalObject)

			expect(actualObject.anImmutableString).toBe(originalObject.anImmutableString)
			expect(actualObject.anImmutableNumber).toBe(originalObject.anImmutableNumber)
			expect(actualObject.anImmutableFunction).toBe(originalObject.anImmutableFunction)

			expect(actualObject.anArray).not.toBe(originalObject.anArray)
			expect(actualObject.anArray).toEqual(originalObject.anArray)

			expect(actualObject.immediateNestedObject).not.toBe(originalObject.immediateNestedObject)
			expect(actualObject.immediateNestedObject).toEqual(originalObject.immediateNestedObject)

			expect(actualObject.immediateNestedObject.deepNestedObject).not.toBe(
				originalObject.immediateNestedObject.deepNestedObject
			)
			expect(actualObject.immediateNestedObject.deepNestedObject).toEqual(
				originalObject.immediateNestedObject.deepNestedObject
			)
		})
	})

	describe('prepareFunctionsPerSettingsProperty', () => {
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

			expectedObjectWithFunctions = applicationUtilities.deepClone(objectWithFunctions)
			actualFunctionsArray = applicationUtilities.prepareFunctionsPerSettingsProperty({
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

	describe('applyOverrides', () => {
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

			applicationUtilities.applyOverrides({
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
