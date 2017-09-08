import getTileOriginAndSize from '../../../src/components/getTileOriginAndSize'
import store from '../../../store'

describe('get tile origin and size', () => {
	const gridAddress = [ 7, 11 ]
	const tileSizeSetting = 40

	it('returns the tile size, and scales the grid address by it to get the origin', () => {
		store.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting }

		expect(getTileOriginAndSize({ gridAddress })).toEqual({
			tileSize: tileSizeSetting,
			tileOrigin: [ 7 * tileSizeSetting, 11 * tileSizeSetting ],
		})
	})

	it('uses a custom get tile origin and sized unit function if provided', () => {
		const custom = ({ gridAddress }) => ({
			tileSize: tileSizeSetting * tileSizeSetting,
			tileOrigin: [ gridAddress[ 1 ] * tileSizeSetting, gridAddress[ 0 ] * tileSizeSetting ],
		})
		store.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize = custom

		expect(getTileOriginAndSize({ gridAddress })).toEqual({
			tileSize: tileSizeSetting * tileSizeSetting,
			tileOrigin: [ 11 * tileSizeSetting, 7 * tileSizeSetting ],
		})
	})
})
