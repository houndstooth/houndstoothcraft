import rotateCoordinateAboutPoint from '../../../../src/space/rotateCoordinateAboutPoint'
import Coordinate from '../../../../src/space/types/Coordinate'

describe('rotate coordinate about point', () => {
	it('rotates a coordinate about a point', () => {
		const coordinate = [ 2, 0 ] as Coordinate
		const point = [ 1, 1 ] as Coordinate
		const rotation = Math.PI / 2

		const actualCoordinates = rotateCoordinateAboutPoint({ coordinate, point, rotation })

		const expectedCoordinates = [ 2, 2 ]
		expect(expectedCoordinates).toEqual(actualCoordinates)
	})
})
