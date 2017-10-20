import { HALF } from '../constants'
import { Coordinate, Outline } from '../space'
import { state } from '../state'
import { defaults } from '../store'

const applyZoom: (outline: Outline) => Outline = outline => outline.map(adjustCoordinateForZoom)

const adjustCoordinateForZoom: (coordinate: Coordinate) => Coordinate = coordinate => {
	const {
		canvasSize,
		centerViewOnCenterOfTileAtHomeAddress,
		zoom = defaults.DEFAULT_ZOOM,
		zoomOnCanvasCenter,
	} = state.mainHoundstooth.basePattern.viewSettings
	const halfCanvasSize = canvasSize as number * HALF
	const shouldAdjustForCentering = zoomOnCanvasCenter && !centerViewOnCenterOfTileAtHomeAddress

	return doAdjustment({ coordinate, shouldAdjustForCentering, halfCanvasSize, zoom })
}

const doAdjustment: (_: {
		coordinate: Coordinate,
		halfCanvasSize: number,
		shouldAdjustForCentering: boolean,
		zoom: number,
	}) => Coordinate = ({ coordinate, shouldAdjustForCentering, halfCanvasSize, zoom }) => {
	let coordinateAdjustedForZoom = coordinate

	if (shouldAdjustForCentering) {
		coordinateAdjustedForZoom = coordinateAdjustedForZoom.map(c => c as any - halfCanvasSize as any) as Coordinate
	}
	coordinateAdjustedForZoom = coordinateAdjustedForZoom.map(c => c as any * zoom as any) as Coordinate
	if (shouldAdjustForCentering) {
		coordinateAdjustedForZoom = coordinateAdjustedForZoom.map(c => c as any + halfCanvasSize) as Coordinate
	}

	return coordinateAdjustedForZoom
}

export { applyZoom }
