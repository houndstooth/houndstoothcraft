import { rotate } from '../../../../src/space/rotate'
import * as to from '../../../../src/utilities/to'

describe('rotate point about a fixed point', () => {
	it('rotates a point about a fixed point', () => {
		const point = to.Coordinate([ 2, 0 ])
		const fixedPoint = to.Coordinate([ 1, 1 ])
		const rotation = to.Radian(Math.PI / 2)

		const actualCoordinates = rotate({ point, fixedPoint, rotation })

		const expectedCoordinates = to.Coordinate([ 2, 2 ])
		expect(actualCoordinates).toEqual(expectedCoordinates)
	})
})
