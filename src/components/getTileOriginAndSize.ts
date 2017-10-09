import state from '../state'

const getTileOriginAndSize = ({ gridAddress }) => {
	const tileOriginAndSize = state.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize || getStandardTileOriginAndSize
	return tileOriginAndSize({ gridAddress })
}

const getStandardTileOriginAndSize = ({ gridAddress }) => {
	const tileSize = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	return {
		tileOrigin: [ gridAddress[ 0 ] * tileSize, gridAddress[ 1 ] * tileSize ],
		tileSize,
	}
}

export default getTileOriginAndSize
