import { squareOutline } from '../../../../src/space/squareOutline'
import { Coordinate } from '../../../../src/space/types/Coordinate'
import { Outline } from '../../../../src/space/types/Outline'

describe('square outline', () => {
	const tileOrigin = [ 2 as any, 3 as any ] as Coordinate
	const tileSize = 5 as any

	it('makes a square in the correct place of the correct size', () => {
		expect(squareOutline({ tileOrigin, tileSize })).toEqual([
			[ 2 as any, 3 as any ],
			[ 7 as any, 3 as any ],
			[ 7 as any, 8 as any ],
			[ 2 as any, 8 as any ],
		] as Outline)
	})
})
