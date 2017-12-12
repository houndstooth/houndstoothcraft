import { Coordinate, tileCenter, TileOriginAndSize, to, Unit } from '../../../../../src/indexForTest'

describe('tile center', () => {
	it('finds the center of the tile', () => {
		const subject: (_: TileOriginAndSize) => Coordinate = tileCenter.default
		const tileOrigin: Coordinate = to.Coordinate([ 12, 14 ])
		const tileSize: Unit = to.Unit(3)
		expect(subject({ tileOrigin, tileSize })).toEqual(to.Coordinate([ 13.5, 15.5 ]))
	})
})
