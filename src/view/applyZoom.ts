import { HALF } from '../constants'
import { Path, Pixel } from '../render'
import { getFromBaseOrDefaultPattern, ViewSettings } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'

const applyZoom: (path: Path) => Path = path => path.map(adjustPixelForZoom)

const adjustPixelForZoom: (pixel: Pixel) => Pixel = pixel => {
	const {
		canvasSize,
		centerViewOnCenterOfTileAtHomeAddress,
		zoom,
		zoomOnCanvasCenter,
	}: ViewSettings = getFromBaseOrDefaultPattern('viewSettings')
	const halfCanvasSize = from.Px(canvasSize) * HALF
	const shouldAdjustForCentering = zoomOnCanvasCenter && !centerViewOnCenterOfTileAtHomeAddress

	return doAdjustment({ pixel, shouldAdjustForCentering, halfCanvasSize, zoom })
}

const doAdjustment: (_: {
	halfCanvasSize: number,
	pixel: Pixel,
	shouldAdjustForCentering: boolean,
	zoom: number,
}) => Pixel = ({ pixel, shouldAdjustForCentering, halfCanvasSize, zoom }) => {
	let pixelAdjustedForZoom = pixel

	if (shouldAdjustForCentering) {
		pixelAdjustedForZoom = to.Pixel(pixelAdjustedForZoom.map(px =>
			from.Px(px) - halfCanvasSize))
	}
	pixelAdjustedForZoom = to.Pixel(pixelAdjustedForZoom.map(px =>
		from.Px(px) * zoom))
	if (shouldAdjustForCentering) {
		pixelAdjustedForZoom = to.Pixel(pixelAdjustedForZoom.map(px =>
			from.Px(px) + halfCanvasSize))
	}

	return pixelAdjustedForZoom
}

export { applyZoom }
