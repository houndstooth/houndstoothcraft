import { HALF } from '../constants'
import { Dimension } from '../page'
import { Path, Pixel } from '../render'
import { Radian } from '../space'
import { getFromBaseOrDefaultPattern } from '../store'
import * as from from '../utilities/from'
import { rotate } from '../utilities/mathUtilities'
import * as to from '../utilities/to'

const applyTilt: (path: Path) => Path = path => {
	const canvasSize: Dimension = getFromBaseOrDefaultPattern('canvasSize')
	const rotateViewAboutCanvasCenter: Radian = getFromBaseOrDefaultPattern('rotateViewAboutCanvasCenter')

	if (!rotateViewAboutCanvasCenter) {
		return path
	}

	const canvasCenter = to.Pixel([ from.Dimension(canvasSize) * HALF, from.Dimension(canvasSize) * HALF ])

	return path.map(pixel => tilt({
		fixedPoint: canvasCenter,
		point: pixel,
		rotation: rotateViewAboutCanvasCenter,
	}))
}

const tilt: (_: { fixedPoint: Pixel, point: Pixel, rotation: Radian }) => Pixel = ({ fixedPoint, point, rotation }) => {
	const rotatedPoint = rotate({ fixedPoint: from.Pixel(fixedPoint), point: from.Pixel(point), rotation })

	return to.Pixel(rotatedPoint)
}

export { applyTilt }
