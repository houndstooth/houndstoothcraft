import { rotateCoordinate } from '../../../../src/space/rotateCoordinate'
import { Coordinate } from '../../../../src/space/types/Coordinate'
import { Radian } from '../../../../src/space/types/Radian'
import * as to from '../../../../src/utilities/to'

describe('rotate coordinate', () => {
	it('rotates one coordinate about another', () => {
		const coordinate: Coordinate = to.Coordinate([ 2, 0 ])
		const fixedCoordinate: Coordinate = to.Coordinate([ 1, 1 ])
		const rotation: Radian = to.Radian(Math.PI / 2)

		const actualCoordinate: Coordinate = rotateCoordinate({ coordinate, fixedCoordinate, rotation })

		const expectedCoordinate: Coordinate = to.Coordinate([ 2, 2 ])
		expect(actualCoordinate).toEqual(expectedCoordinate)
	})
})
