import state from '../state'
import { Address, TileOriginAndSize } from './types'

type GetTileOriginAndSize = { ({}: { gridAddress: Address }): TileOriginAndSize }
const getTileOriginAndSize: GetTileOriginAndSize = ({ gridAddress }) => {
	const getTileOriginAndSizeFromState = state.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize
	const tileOriginAndSize = getTileOriginAndSizeFromState || getStandardTileOriginAndSize
	return tileOriginAndSize({ gridAddress })
}

const getStandardTileOriginAndSize: GetTileOriginAndSize = ({ gridAddress }) => {
	const tileSize = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	return {
		tileOrigin: [ gridAddress[ 0 ] * tileSize, gridAddress[ 1 ] * tileSize ],
		tileSize,
	}
}

export default getTileOriginAndSize
