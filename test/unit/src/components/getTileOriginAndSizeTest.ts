import getTileOriginAndSize from '../../../../src/components/getTileOriginAndSize'
import state from '../../../../src/state'
import Address from '../../../../src/components/types/Address'
import Coordinate from '../../../../src/space/types/Coordinate'

describe('get tile origin and size', () => {
	const gridAddressForSubject = [ 7, 11 ] as Address
	const tileSizeSetting = 40 as any

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		state.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting }

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileSize: tileSizeSetting,
			tileOrigin: [ 7 * tileSizeSetting as any, 11 * tileSizeSetting as any ] as Coordinate,
		})
	})

	it('uses a custom get tile origin and sized unit function if provided', () => {
		const custom = ({ gridAddress }) => ({
			tileSize: tileSizeSetting * tileSizeSetting as any,
			tileOrigin: [ gridAddress[ 1 ] * tileSizeSetting as any, gridAddress[ 0 ] * tileSizeSetting as any ] as Coordinate,
		})
		state.mainHoundstooth.basePattern.tileSettings = { getTileOriginAndSize: custom }

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileSize: tileSizeSetting * tileSizeSetting as any,
			tileOrigin: [ 11 * tileSizeSetting as any, 7 * tileSizeSetting as any ] as Coordinate,
		})
	})
})
