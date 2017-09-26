import rotateCoordinateAboutPoint from '../../../../src/space/rotateCoordinateAboutPoint'

describe('rotate coordinate about point', () => {
	it('rotates a coordinate about a point', () => {
		const coordinate = [ 2, 0 ]
		const point = [ 1, 1 ]
		const rotation = Math.PI / 2

		const actualCoordinates = rotateCoordinateAboutPoint({ coordinate, point, rotation })

		const expectedCoordinates = [ 2, 2 ]
		expect(expectedCoordinates).toEqual(actualCoordinates)
	})
})
