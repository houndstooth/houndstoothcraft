import squareOutline from '../../../../src/space/squareOutline'
import Coordinate from '../../../../src/space/types/Coordinate'
import Outline from '../../../../src/space/types/Outline'

describe('square outline', () => {
	const tileOrigin = [ 2, 3 ] as Coordinate
	const tileSize = 5

	it('makes a square in the correct place of the correct size', () => {
		expect(squareOutline({ tileOrigin, tileSize })).toEqual([
			[ 2, 3 ],
			[ 7, 3 ],
			[ 7, 8 ],
			[ 2, 8 ],
		] as Outline)
	})
})
