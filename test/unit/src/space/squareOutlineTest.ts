import { squareOutline } from '../../../../src/space/squareOutline'
import * as to from '../../../../src/utilities/to'

describe('square outline', () => {
	const tileOrigin = to.Coordinate([ 2, 3 ])
	const tileSize = to.Unit(5)

	it('makes a square in the correct place of the correct size', () => {
		expect(squareOutline({ tileOrigin, tileSize })).toEqual(to.Outline([
			[ 2, 3 ],
			[ 7, 3 ],
			[ 7, 8 ],
			[ 2, 8 ],
		]))
	})
})
