import { from, state, to } from '../../../../src'
import { getTileOriginAndSize } from '../../../../src/components/getTileOriginAndSize'
import { getSetting } from '../../../../src/store/getSetting'
import { TileSettings } from '../../../../src/store/types/settings/TileSettings'

describe('get tile origin and size', () => {
	const gridAddressForSubject = to.Address([ 7, 11 ])
	const tileSizeSetting = to.Unit(40)

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		state.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting }

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Unit(tileSizeSetting) * 7, from.Unit(tileSizeSetting) * 11 ]),
			tileSize: to.Unit(from.Unit(tileSizeSetting)),
		})
	})

	it('uses a custom get tile origin and sized unit function if provided', () => {
		const custom = ({ gridAddress }) => ({
			tileOrigin: to.Coordinate([
				gridAddress[ 1 ] * from.Unit(tileSizeSetting),
				gridAddress[ 0 ] * from.Unit(tileSizeSetting),
			]),
			tileSize: to.Unit(from.Unit(tileSizeSetting) * from.Unit(tileSizeSetting)),
		})
		const tileSettings: TileSettings = getSetting('tile')
		tileSettings.getTileOriginAndSize = custom

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Unit(tileSizeSetting) * 11, from.Unit(tileSizeSetting) * 7 ]),
			tileSize: to.Unit(from.Unit(tileSizeSetting) * from.Unit(tileSizeSetting)),
		})
	})
})
