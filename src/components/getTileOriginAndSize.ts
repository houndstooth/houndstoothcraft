import state from '../state'
import { Address, TileOriginAndSize } from './types'
import { Coordinate } from '../space'

const getTileOriginAndSize: {
	({}: { gridAddress: Address }): TileOriginAndSize | undefined,
} = ({ gridAddress }) => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const tileSettings = basePattern.tileSettings || {}
	const getTileOriginAndSizeFromState = tileSettings.getTileOriginAndSize
	const tileOriginAndSize = getTileOriginAndSizeFromState || getStandardTileOriginAndSize

	return tileOriginAndSize({ gridAddress })
}

const getStandardTileOriginAndSize: {
	({}: { gridAddress: Address }): TileOriginAndSize,
} = ({ gridAddress }) => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const tileSettings = basePattern.tileSettings || {}
	const tileSize: any = tileSettings.tileSizeSetting

	return {
		tileOrigin: [ gridAddress[ 0 ] * tileSize as any, gridAddress[ 1 ] * tileSize as any ] as Coordinate,
		tileSize,
	}
}

export default getTileOriginAndSize
