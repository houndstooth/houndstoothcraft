import state from '../state'

const applyScroll = outline => {
	const viewSettings = state.mainHoundstooth.basePattern.viewSettings
	const centerViewOnCenterOfTileAtHomeAddress = viewSettings.centerViewOnCenterOfTileAtHomeAddress

	if (!centerViewOnCenterOfTileAtHomeAddress) return outline

	return outline.map(applyCenterViewOnCenterOfTileAtHomeAddress)
}

const applyCenterViewOnCenterOfTileAtHomeAddress = coordinate => {
	const canvasSize = state.mainHoundstooth.basePattern.viewSettings.canvasSize
	const canvasCenter = canvasSize / 2

	const tileSizeSetting = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	const halfTileSize = tileSizeSetting / 2

	return [
		coordinate[ 0 ] + canvasCenter - halfTileSize,
		coordinate[ 1 ] + canvasCenter - halfTileSize,
	]
}

export default applyScroll
