import { getSetting, Path, Pixel, Px } from '../../app'
import { HALF } from '../../constants'
import { from, mathUtilities, to } from '../../utilities'
import { Radian } from '../stripe'

const applyTilt: (path: Path) => Path =
	(path: Path): Path => {
		const canvasSize: Px = getSetting.default('canvasSize')
		const rotateViewAboutCanvasCenter: Radian = getSetting.default('rotateViewAboutCanvasCenter')

		if (!rotateViewAboutCanvasCenter) {
			return path
		}

		const canvasCenter: Pixel = to.Pixel([ from.Px(canvasSize) * HALF, from.Px(canvasSize) * HALF ])

		return to.Path(path.map((pixel: Pixel): Pixel => tilt({
			fixedPoint: canvasCenter,
			point: pixel,
			rotation: rotateViewAboutCanvasCenter,
		})))
	}

const tilt: (_: { fixedPoint: Pixel, point: Pixel, rotation: Radian }) => Pixel =
	({ fixedPoint, point, rotation }: { fixedPoint: Pixel, point: Pixel, rotation: Radian }): Pixel =>
		to.Pixel(mathUtilities.rotate({ fixedPoint: from.Pixel(fixedPoint), point: from.Pixel(point), rotation }))

export default applyTilt
