import state from '../../state'

export default outline => {
	const viewSettings = state.mainHoundstooth.basePattern.viewSettings
	const centerViewOnCenterOfTileAtZeroZeroAddress = viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress

	if (!centerViewOnCenterOfTileAtZeroZeroAddress) return outline

	return outline.map(applyCenterViewOnCenterOfTileAtZeroZeroAddress)
}

const applyCenterViewOnCenterOfTileAtZeroZeroAddress = coordinate => {
	const canvasSize = state.mainHoundstooth.basePattern.viewSettings.canvasSize
	const canvasCenter = canvasSize / 2

	const tileSizeSetting = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	const halfTileSize = tileSizeSetting / 2

	return [
		coordinate[ 0 ] + canvasCenter - halfTileSize,
		coordinate[ 1 ] + canvasCenter - halfTileSize,
	]
}
