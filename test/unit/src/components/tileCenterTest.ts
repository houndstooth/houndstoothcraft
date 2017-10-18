import { tileCenter } from '../../../../src/components/tileCenter'
import { Coordinate } from '../../../../src/space/types/Coordinate'

describe('tile center', () => {
	it('finds the center of the tile', () => {
		const tileOrigin = [ 12 as any, 14 as any ] as Coordinate
		const tileSize = 3 as any
		expect(tileCenter({ tileOrigin, tileSize })).toEqual([ 13.5 as any, 15.5 as any ])
	})
})
