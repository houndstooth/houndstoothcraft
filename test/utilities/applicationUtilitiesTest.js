import 'jasmine'
import applicationUtilities from '../../src/utilities/applicationUtilities'

describe("application utilities", () => {
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
					set: [ 0, 1 ]
				},
				mode: 'COOLNESS'
			}
			const objectToResetTo = {
				mode: 'OG_NESS',
				foo: 'bar'
			}

			applicationUtilities.resetObject({ objectToReset, objectToResetTo })

			const expectedObject = {
				colorConfig: {
					set: [ 0, 1 ]
				},
				mode: 'OG_NESS',
				foo: 'bar'
			}
			expect(objectToReset).toEqual(expectedObject)
		})
	})
})
