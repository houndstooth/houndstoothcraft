import { HALF } from '../constants'
import { Px } from '../page'
import { Path, Pixel } from '../render'
import { getFromBaseOrDefaultPattern, ViewSettings } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { DoAdjustmentParams } from './types'

const applyZoom: (path: Path) => Path =
	(path: Path): Path => to.Path(path.map(adjustPixelForZoom))

const adjustPixelForZoom: (pixel: Pixel) => Pixel =
	(pixel: Pixel): Pixel => {
		const {
			canvasSize,
			centerViewOnCenterOfTileAtHomeAddress,
			zoom,
			zoomOnCanvasCenter,
		}: ViewSettings = getFromBaseOrDefaultPattern('viewSettings')
		const halfCanvasSize: Px = to.Px(from.Px(canvasSize) * HALF)
		const shouldAdjustForCentering: boolean = zoomOnCanvasCenter && !centerViewOnCenterOfTileAtHomeAddress

		return doAdjustment({ pixel, shouldAdjustForCentering, halfCanvasSize, zoom })
	}

const doAdjustment: (_: DoAdjustmentParams) => Pixel =
	({ pixel, shouldAdjustForCentering, halfCanvasSize, zoom }: DoAdjustmentParams): Pixel => {
		let pixelAdjustedForZoom: Pixel = pixel

		if (shouldAdjustForCentering) {
			pixelAdjustedForZoom = to.Pixel(pixelAdjustedForZoom.map((px: Px): number =>
				from.Px(px) - from.Px(halfCanvasSize)))
		}
		pixelAdjustedForZoom = to.Pixel(pixelAdjustedForZoom.map((px: Px): number =>
			from.Px(px) * zoom))
		if (shouldAdjustForCentering) {
			pixelAdjustedForZoom = to.Pixel(pixelAdjustedForZoom.map((px: Px): number =>
				from.Px(px) + from.Px(halfCanvasSize)))
		}

		return pixelAdjustedForZoom
	}

export { applyZoom }
