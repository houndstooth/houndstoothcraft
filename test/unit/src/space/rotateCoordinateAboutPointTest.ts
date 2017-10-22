import { rotateCoordinateAboutPoint } from '../../../../src/space/rotateCoordinateAboutPoint'
import * as to from '../../../../src/utilities/to'

describe('rotate coordinate about point', () => {
	it('rotates a coordinate about a point', () => {
		const coordinate = to.Coordinate([ 2, 0 ])
		const point = to.Coordinate([ 1, 1 ])
		const rotation = to.Radian(Math.PI / 2)

		const actualCoordinates = rotateCoordinateAboutPoint({ coordinate, point, rotation })

		const expectedCoordinates = to.Coordinate([ 2, 2 ])
		expect(actualCoordinates).toEqual(expectedCoordinates)
	})
})
