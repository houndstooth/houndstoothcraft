import { Unit } from '../../../../../src/pattern/grid/types'
import { Coordinate } from '../../../../../src/pattern/stripe'
import { tileCenter } from '../../../../../src/pattern/tile/tileCenter'
import * as to from '../../../../../src/to'

describe('tile center', () => {
	it('finds the center of the tile', () => {
		const tileOrigin: Coordinate = to.Coordinate([ 12, 14 ])
		const tileSize: Unit = to.Unit(3)
		expect(tileCenter({ tileOrigin, tileSize })).toEqual(to.Coordinate([ 13.5, 15.5 ]))
	})
})
