import getTileOriginAndSize from '../../../../src/components/getTileOriginAndSize'
import state from '../../../../src/state'
import Address from '../../../../src/components/types/Address'
import Coordinate from '../../../../src/space/types/Coordinate'

describe('get tile origin and size', () => {
	const gridAddressForSubject = [ 7, 11 ] as Address
	const tileSizeSetting = 40

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		state.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting }

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileSize: tileSizeSetting,
			tileOrigin: [ 7 * tileSizeSetting, 11 * tileSizeSetting ] as Coordinate,
		})
	})

	it('uses a custom get tile origin and sized unit function if provided', () => {
		const custom = ({ gridAddress }) => ({
			tileSize: tileSizeSetting * tileSizeSetting,
			tileOrigin: [ gridAddress[ 1 ] * tileSizeSetting, gridAddress[ 0 ] * tileSizeSetting ] as Coordinate,
		})
		state.mainHoundstooth.basePattern.tileSettings = { getTileOriginAndSize: custom }

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileSize: tileSizeSetting * tileSizeSetting,
			tileOrigin: [ 11 * tileSizeSetting, 7 * tileSizeSetting ] as Coordinate,
		})
	})
})
