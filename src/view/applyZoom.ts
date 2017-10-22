import { HALF } from '../constants'
import { Coordinate, Outline } from '../space'
import { getFromBaseOrDefaultPattern, ViewSettings } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'

const applyZoom: (outline: Outline) => Outline = outline => outline.map(adjustCoordinateForZoom)

const adjustCoordinateForZoom: (coordinate: Coordinate) => Coordinate = coordinate => {
	const {
		canvasSize,
		centerViewOnCenterOfTileAtHomeAddress,
		zoom,
		zoomOnCanvasCenter,
	}: ViewSettings = getFromBaseOrDefaultPattern('viewSettings')
	const halfCanvasSize = from.Dimension(canvasSize) * HALF
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
		coordinateAdjustedForZoom = to.Coordinate(coordinateAdjustedForZoom.map(c =>
			from.Unit(c) - halfCanvasSize))
	}
	coordinateAdjustedForZoom = to.Coordinate(coordinateAdjustedForZoom.map(c =>
		from.Unit(c) * zoom))
	if (shouldAdjustForCentering) {
		coordinateAdjustedForZoom = to.Coordinate(coordinateAdjustedForZoom.map(c =>
			from.Unit(c) + halfCanvasSize))
	}

	return coordinateAdjustedForZoom
}

export { applyZoom }
