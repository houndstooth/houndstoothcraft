import { to } from '../../../../src'
import { tileCenter } from '../../../../src/components/tileCenter'
import { Unit } from '../../../../src/components'
import { Coordinate } from '../../../../src/space'

describe('tile center', () => {
	it('finds the center of the tile', () => {
		const tileOrigin: Coordinate = to.Coordinate([ 12, 14 ])
		const tileSize: Unit = to.Unit(3)
		expect(tileCenter({ tileOrigin, tileSize })).toEqual(to.Coordinate([ 13.5, 15.5 ]))
	})
})
