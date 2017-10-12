import state from '../state'
import { Outline, Coordinate } from '../space'

const applyZoom: { (outline: Outline): Outline } = outline => outline.map(adjustCoordinateForZoom)

const adjustCoordinateForZoom: { (coordinate: Coordinate): Coordinate } = coordinate => {
	const viewSettings = state.mainHoundstooth.basePattern.viewSettings || {}
	const { zoom, zoomOnCanvasCenter, canvasSize, centerViewOnCenterOfTileAtHomeAddress } = viewSettings
	const canvasCenter = canvasSize / 2
	const shouldAdjustForCentering = zoomOnCanvasCenter && !centerViewOnCenterOfTileAtHomeAddress

	if (shouldAdjustForCentering) {
		coordinate = coordinate.map(c => c - canvasCenter)
	}
	coordinate = coordinate.map(c => c * zoom)
	if (shouldAdjustForCentering) {
		coordinate = coordinate.map(c => c + canvasCenter)
	}

	return coordinate
}

export default applyZoom
