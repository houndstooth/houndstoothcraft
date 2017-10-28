import { Unit } from '../../../../src/components'
import { Coordinate } from '../../../../src/space'
import { squareOutline } from '../../../../src/space/squareOutline'
import * as to from '../../../../src/utilities/to'

describe('square outline', () => {
	const tileOrigin: Coordinate = to.Coordinate([ 2, 3 ])
	const tileSize: Unit = to.Unit(5)

	it('makes a square in the correct place of the correct size', () => {
		expect(squareOutline({ tileOrigin, tileSize })).toEqual(to.Outline([
			[ 2, 3 ],
			[ 7, 3 ],
			[ 7, 8 ],
			[ 2, 8 ],
		]))
	})
})
