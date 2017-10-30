import { HALF } from '../constants'
import { Px } from '../page'
import { Path, Pixel } from '../render'
import { Radian } from '../space'
import { getFromBaseOrDefaultPattern } from '../store'
import * as from from '../utilities/from'
import { rotate } from '../utilities/mathUtilities'
import * as to from '../utilities/to'

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
		to.Pixel(rotate({ fixedPoint: from.Pixel(fixedPoint), point: from.Pixel(point), rotation }))

export { applyTilt }
