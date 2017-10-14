import tileCenter from '../../../../src/components/tileCenter'
import Coordinate from '../../../../src/space/types/Coordinate'

describe('tile center', () => {
	it('finds the center of the tile', () => {
		const tileOrigin = [ 12, 14 ] as Coordinate
		const tileSize = 3
		expect(tileCenter({ tileOrigin, tileSize })).toEqual([ 13.5, 15.5 ])
	})
})
