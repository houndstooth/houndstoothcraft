import { Coordinate } from '../space'
import { state } from '../state'
import { Address, TileOriginAndSize } from './types'

const getTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize | undefined = ({ gridAddress }) => {
	// tslint:disable-next-line:max-line-length
	const tileOriginAndSize = state.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize || getStandardTileOriginAndSize

	return tileOriginAndSize({ gridAddress })
}

const getStandardTileOriginAndSize: (_: { gridAddress: Address }) => TileOriginAndSize = ({ gridAddress }) => {
	const tileSize = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting

	return {
		tileOrigin: [ gridAddress[ 0 ] * tileSize as any, gridAddress[ 1 ] * tileSize as any ] as Coordinate,
		tileSize,
	}
}

export { getTileOriginAndSize }
