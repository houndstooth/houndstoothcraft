import rotateCoordinateAboutPoint from '../../../../src/space/rotateCoordinateAboutPoint'
import Coordinate from '../../../../src/space/types/Coordinate'

describe('rotate coordinate about point', () => {
	it('rotates a coordinate about a point', () => {
		const coordinate = [ 2 as any, 0 as any ] as Coordinate
		const point = [ 1 as any, 1 as any ] as Coordinate
		const rotation = Math.PI / 2

		const actualCoordinates = rotateCoordinateAboutPoint({ coordinate, point, rotation })

		const expectedCoordinates = [ 2 as any, 2 as any ]
		expect(expectedCoordinates).toEqual(actualCoordinates)
	})
})
