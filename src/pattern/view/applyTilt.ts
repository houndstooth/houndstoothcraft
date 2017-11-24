import { Path, Pixel, Px } from '../../app'
// tslint:disable-next-line:no-reaching-imports
import { getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import { HALF } from '../../constants'
import * as from from '../../from'
import * as to from '../../to'
import { mathUtilities } from '../../utilities'
import { Radian } from '../stripe'

const applyTilt: (path: Path) => Path =
	(path: Path): Path => {
		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')
		const rotateViewAboutCanvasCenter: Radian = getFromBaseOrDefaultPattern('rotateViewAboutCanvasCenter')

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

export { applyTilt }
