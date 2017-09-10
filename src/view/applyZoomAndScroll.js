import state from '../../state'

export default outline => {
	const newOutline = []

	outline.forEach(coordinate => {
		let newCoordinate = adjustCoordinateForZoom({ coordinate })
		if (state.mainHoundstooth.basePattern.viewSettings && state.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress) {
			newCoordinate = centerViewOnCenterOfTileAtZeroZeroAddress({ coordinate: newCoordinate })
		}
		newOutline.push(newCoordinate)
	})

	return newOutline
}

const adjustCoordinateForZoom = ({ coordinate }) => {
	const { zoom, zoomOnCanvasCenter, canvasSize, centerViewOnCenterOfTileAtZeroZeroAddress } = state.mainHoundstooth.basePattern.viewSettings || {}
	const canvasCenter = canvasSize / 2

	if (zoomOnCanvasCenter && !centerViewOnCenterOfTileAtZeroZeroAddress) {
		coordinate[ 0 ] -= canvasCenter
		coordinate[ 1 ] -= canvasCenter
	}

	coordinate[ 0 ] *= zoom
	coordinate[ 1 ] *= zoom

	if (zoomOnCanvasCenter && !centerViewOnCenterOfTileAtZeroZeroAddress) {
		coordinate[ 0 ] += canvasCenter
		coordinate[ 1 ] += canvasCenter
	}

	return coordinate
}

const centerViewOnCenterOfTileAtZeroZeroAddress = ({ coordinate }) => {
	const canvasSize = state.mainHoundstooth.basePattern.viewSettings.canvasSize
	const canvasCenter = canvasSize / 2

	const tileSizeSetting = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
	const halfTileSize = tileSizeSetting / 2

	return [
		coordinate[ 0 ] + canvasCenter - halfTileSize,
		coordinate[ 1 ] + canvasCenter - halfTileSize,
	]
}
