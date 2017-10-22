import { from, state, to } from '../../../../src'
import { getTileOriginAndSize } from '../../../../src/components/getTileOriginAndSize'
import { setSetting } from '../../../../src/store/setSetting'

describe('get tile origin and size', () => {
	const gridAddressForSubject = to.Address([ 7, 11 ])
	const tileSize = to.Unit(40)

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		state.mainHoundstooth.basePattern.tileSettings = { tileSize }

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Unit(tileSize) * 7, from.Unit(tileSize) * 11 ]),
			tileSize: to.Unit(from.Unit(tileSize)),
		})
	})

	it('uses a custom get tile origin and sized unit function if provided', () => {
		const custom = ({ gridAddress }) => ({
			tileOrigin: to.Coordinate([
				gridAddress[ 1 ] * from.Unit(tileSize),
				gridAddress[ 0 ] * from.Unit(tileSize),
			]),
			tileSize: to.Unit(from.Unit(tileSize) * from.Unit(tileSize)),
		})
		setSetting('getTileOriginAndSize', custom)

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Unit(tileSize) * 11, from.Unit(tileSize) * 7 ]),
			tileSize: to.Unit(from.Unit(tileSize) * from.Unit(tileSize)),
		})
	})
})
