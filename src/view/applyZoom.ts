import state from '../state'

const applyZoom = outline => outline.map(adjustCoordinateForZoom)

const adjustCoordinateForZoom = coordinate => {
	const { zoom, zoomOnCanvasCenter, canvasSize, centerViewOnCenterOfTileAtHomeAddress } = state.mainHoundstooth.basePattern.viewSettings || {}
	const canvasCenter = canvasSize / 2
	const shouldAdjustForCentering = zoomOnCanvasCenter && !centerViewOnCenterOfTileAtHomeAddress

	if (shouldAdjustForCentering) coordinate = coordinate.map(c => c -= canvasCenter)
	coordinate = coordinate.map(c => c *= zoom)
	if (shouldAdjustForCentering) coordinate = coordinate.map(c => c += canvasCenter)

	return coordinate
}

export default applyZoom
