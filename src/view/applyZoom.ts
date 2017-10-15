import state from '../state'
import { Outline, Coordinate } from '../space'

const applyZoom: { (outline: Outline): Outline } = outline => outline.map(adjustCoordinateForZoom)

const adjustCoordinateForZoom: { (coordinate: Coordinate): Coordinate } = coordinate => {
	const viewSettings = state.mainHoundstooth.basePattern.viewSettings || {}
	const { zoom, zoomOnCanvasCenter, canvasSize, centerViewOnCenterOfTileAtHomeAddress } = viewSettings
	const halfCanvasSize = canvasSize as number / 2
	const shouldAdjustForCentering = zoomOnCanvasCenter && !centerViewOnCenterOfTileAtHomeAddress

	return doAdjustment({ coordinate, shouldAdjustForCentering, halfCanvasSize, zoom })
}

type DoAdjustment = {
	({}: {
		coordinate: Coordinate,
		shouldAdjustForCentering: boolean,
		halfCanvasSize: number,
		zoom: number,
	}): Coordinate,
}

const doAdjustment: DoAdjustment = ({ coordinate, shouldAdjustForCentering, halfCanvasSize, zoom }) => {
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

export default applyZoom
