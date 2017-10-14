import state from '../state'
import { Outline, Coordinate } from '../space'

const applyZoom: { (outline: Outline): Outline } = outline => outline.map(adjustCoordinateForZoom)

const adjustCoordinateForZoom: { (coordinate: Coordinate): Coordinate } = coordinate => {
	const viewSettings = state.mainHoundstooth.basePattern.viewSettings || {}
	const { zoom, zoomOnCanvasCenter, canvasSize, centerViewOnCenterOfTileAtHomeAddress } = viewSettings
	const canvasCenter = canvasSize / 2
	const shouldAdjustForCentering = zoomOnCanvasCenter && !centerViewOnCenterOfTileAtHomeAddress

	if (shouldAdjustForCentering) {
		coordinate = coordinate.map(c => c - canvasCenter) as Coordinate
	}
	coordinate = coordinate.map(c => c * zoom) as Coordinate
	if (shouldAdjustForCentering) {
		coordinate = coordinate.map(c => c + canvasCenter) as Coordinate
	}

	return coordinate
}

export default applyZoom
