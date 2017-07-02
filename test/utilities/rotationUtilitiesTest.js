import rotationUtilities from '../../src/utilities/rotationUtilities'

describe('rotation utilities', () => {
	describe('#applyRotationToShape', () => {
		let applyRotationToShape
		beforeEach(() => applyRotationToShape = rotationUtilities.applyRotationToShape)

		describe('when base stripe diagonal is principal', () => {
			it('rotates the coordinates a quarter of the way around, about the shape\'s center', () => {
				const coordinates = [
					[ 0, 0 ],
					[ 5, 0 ],
					[ 0, 5 ],
				]
				const tileOrigin = [ 0, 0 ]
				const sizedUnit = 5

				const result = applyRotationToShape({ coordinates, tileOrigin, sizedUnit })

				const expectedCoordinates = [
				]
				expect(result).toBe(expectedCoordinates)
			})
		})
	})
})