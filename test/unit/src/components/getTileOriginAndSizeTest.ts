import { getTileOriginAndSize } from '../../../../src/components/getTileOriginAndSize'
import { Address } from '../../../../src/components/types/Address'
import { Coordinate } from '../../../../src/space/types/Coordinate'
import { state } from '../../../../src/state'

describe('get tile origin and size', () => {
	const gridAddressForSubject = [ 7, 11 ] as Address
	const tileSizeSetting = 40 as any

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		const basePattern = state.mainHoundstooth.basePattern || {}
		basePattern.tileSettings = { tileSizeSetting }

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: [ tileSizeSetting * 7 as any, tileSizeSetting * 11 as any ] as Coordinate,
			tileSize: tileSizeSetting,
		})
	})

	it('uses a custom get tile origin and sized unit function if provided', () => {
		const custom = ({ gridAddress }) => ({
			tileOrigin: [ gridAddress[ 1 ] * tileSizeSetting as any, gridAddress[ 0 ] * tileSizeSetting as any ] as Coordinate,
			tileSize: tileSizeSetting * tileSizeSetting as any,
		})
		const basePattern = state.mainHoundstooth.basePattern || {}
		basePattern.tileSettings = { getTileOriginAndSize: custom }

		expect(getTileOriginAndSize({ gridAddress: gridAddressForSubject })).toEqual({
			tileOrigin: [ tileSizeSetting * 11 as any, tileSizeSetting * 7 as any ] as Coordinate,
			tileSize: tileSizeSetting * tileSizeSetting as any,
		})
	})
})
