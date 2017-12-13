import { Path, Pixel } from '../../app'
import { CANVAS_SIZE } from '../../constants'
import { from, mathUtilities, to } from '../../utilities'
import { HALF } from '../constants'
import { patternState } from '../patternState'
import { Radian } from '../stripe'

const applyTilt: (_: Path) => Path =
	(path: Path): Path => {
		const rotationAboutCanvasCenter: Radian = patternState.viewSettings.rotationAboutCanvasCenter

		if (!rotationAboutCanvasCenter) {
			return path
		}

		const canvasCenter: Pixel = to.Pixel([ from.Px(CANVAS_SIZE) * HALF, from.Px(CANVAS_SIZE) * HALF ])

		return to.Path(path.map((pixel: Pixel): Pixel => tilt({
			fixedPoint: canvasCenter,
			point: pixel,
			rotation: rotationAboutCanvasCenter,
		})))
	}

const tilt: (_: { fixedPoint: Pixel, point: Pixel, rotation: Radian }) => Pixel =
	({ fixedPoint, point, rotation }: { fixedPoint: Pixel, point: Pixel, rotation: Radian }): Pixel =>
		to.Pixel(mathUtilities.rotate({ fixedPoint: from.Pixel(fixedPoint), point: from.Pixel(point), rotation }))

export default applyTilt
