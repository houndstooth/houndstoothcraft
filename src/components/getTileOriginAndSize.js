import store from '../../store'

export default ({ gridAddress }) => {
	const getTileOriginAndSize = store.mainHoundstooth.basePattern.tileSettings.getTileOriginAndSize || getStandardTileOriginAndSize
	return getTileOriginAndSize({ gridAddress })
}

const getStandardTileOriginAndSize = ({ gridAddress }) => {
	const tileSize = store.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	return {
		tileOrigin: [ gridAddress[ 0 ] * tileSize, gridAddress[ 1 ] * tileSize ],
		tileSize,
	}
}
