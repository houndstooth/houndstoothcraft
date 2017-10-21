import { from, state, to } from '../../../../src'
import { getTileOriginAndSize } from '../../../../src/components/getTileOriginAndSize'

describe('get tile origin and size', () => {
	const gridAddressForSubject = to.Address([ 7, 11 ])
	const tileSizeSetting = to.Units(40)

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		state.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting }

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Units(tileSizeSetting) * 7, from.Units(tileSizeSetting) * 11 ]),
			tileSize: to.Units(from.Units(tileSizeSetting)),
		})
	})

	it('uses a custom get tile origin and sized unit function if provided', () => {
		const custom = ({ gridAddress }) => ({
			tileOrigin: to.Coordinate([
				gridAddress[ 1 ] * from.Units(tileSizeSetting),
				gridAddress[ 0 ] * from.Units(tileSizeSetting),
			]),
			tileSize: from.Units(tileSizeSetting) * from.Units(tileSizeSetting),
		})
		state.mainHoundstooth.basePattern.tileSettings = { getTileOriginAndSize: custom }

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: to.Coordinate([ from.Units(tileSizeSetting) * 11, from.Units(tileSizeSetting) * 7 ]),
			tileSize: to.Units(from.Units(tileSizeSetting) * from.Units(tileSizeSetting)),
		})
	})
})
