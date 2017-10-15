import state from '../state'
import { Address, TileOriginAndSize } from './types'
import { Coordinate } from '../space'

type GetTileOriginAndSize = { ({}: { gridAddress: Address }): TileOriginAndSize }
const getTileOriginAndSize: GetTileOriginAndSize = ({ gridAddress }) => {
	const getTileOriginAndSizeFromState = state.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize
	const tileOriginAndSize = getTileOriginAndSizeFromState || getStandardTileOriginAndSize

	return tileOriginAndSize({ gridAddress })
}

const getStandardTileOriginAndSize: GetTileOriginAndSize = ({ gridAddress }) => {
	const tileSize: any = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting

	return {
		tileOrigin: [ gridAddress[ 0 ] * tileSize as any, gridAddress[ 1 ] * tileSize as any ] as Coordinate,
		tileSize,
	}
}

export default getTileOriginAndSize
