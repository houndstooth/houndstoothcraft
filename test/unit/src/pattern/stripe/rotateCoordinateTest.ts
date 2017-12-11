import { Coordinate, Radian, rotateCoordinate, RotateCoordinateParams, to } from '../../../../../src/indexForTest'

const subject: (_: RotateCoordinateParams) => Coordinate = rotateCoordinate.default

describe('rotate coordinate', () => {
	it('rotates one coordinate about another', () => {
		const coordinate: Coordinate = to.Coordinate([ 2, 0 ])
		const fixedCoordinate: Coordinate = to.Coordinate([ 1, 1 ])
		const rotation: Radian = to.Radian(Math.PI / 2)

		const actualCoordinate: Coordinate = subject({ coordinate, fixedCoordinate, rotation })

		const expectedCoordinate: Coordinate = to.Coordinate([ 2, 2 ])
		expect(actualCoordinate).toEqual(expectedCoordinate)
	})
})
