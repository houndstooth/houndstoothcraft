import state from '../../state'

export default outline => outline.map(adjustCoordinateForZoom)

const adjustCoordinateForZoom = coordinate => {
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
