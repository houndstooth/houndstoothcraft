import { rotateCoordinate } from '../../../../src/space/rotateCoordinate'
import * as to from '../../../../src/utilities/to'

describe('rotate coordinate', () => {
	it('rotates one coordinate about another', () => {
		const coordinate = to.Coordinate([ 2, 0 ])
		const fixedCoordinate = to.Coordinate([ 1, 1 ])
		const rotation = to.Radian(Math.PI / 2)

		const actualCoordinates = rotateCoordinate({ coordinate, fixedCoordinate, rotation })

		const expectedCoordinates = to.Coordinate([ 2, 2 ])
		expect(actualCoordinates).toEqual(expectedCoordinates)
	})
})
