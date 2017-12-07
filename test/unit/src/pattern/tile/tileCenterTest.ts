import { Coordinate, tileCenter, TileOriginAndSize, to, Unit } from '../../../../../src'

const subject: (_: TileOriginAndSize) => Coordinate = tileCenter.default

describe('tile center', () => {
	it('finds the center of the tile', () => {
		const tileOrigin: Coordinate = to.Coordinate([ 12, 14 ])
		const tileSize: Unit = to.Unit(3)
		expect(subject({ tileOrigin, tileSize })).toEqual(to.Coordinate([ 13.5, 15.5 ]))
	})
})
