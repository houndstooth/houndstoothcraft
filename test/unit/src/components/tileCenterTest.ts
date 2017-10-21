import { to } from '../../../../src'
import { tileCenter } from '../../../../src/components/tileCenter'

describe('tile center', () => {
	it('finds the center of the tile', () => {
		const tileOrigin = to.Coordinate([ 12, 14 ])
		const tileSize = to.Units(3)
		expect(tileCenter({ tileOrigin, tileSize })).toEqual(to.Coordinate([ 13.5, 15.5 ]))
	})
})
