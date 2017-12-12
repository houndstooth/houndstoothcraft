import { Path, Pixel, Px } from '../../app'
import { CANVAS_SIZE, HALF } from '../../constants'
import { from, to } from '../../utilities'
import { patternState } from '../patternState'
import { DoAdjustmentParams } from './types'
import { ViewSettings } from './viewSettings'

const applyZoom: (_: Path) => Path =
	(path: Path): Path => to.Path(path.map(adjustPixelForZoom))

const adjustPixelForZoom: (_: Pixel) => Pixel =
	(pixel: Pixel): Pixel => {
		const {
			centerViewOnCenterOfTileAtHomeAddress,
			zoom,
			zoomOnCanvasCenter,
		}: ViewSettings = patternState.viewSettings
		const halfCanvasSize: Px = to.Px(from.Px(CANVAS_SIZE) * HALF)
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

export default applyZoom
