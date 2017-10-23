import { HALF } from '../constants'
import { Dimension } from '../page'
import { Path } from '../render'
import { Radian, rotate } from '../space'
import { getFromBaseOrDefaultPattern } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'

const applyTilt: (path: Path) => Path = path => {
	const canvasSize: Dimension = getFromBaseOrDefaultPattern('canvasSize')
	const rotateViewAboutCanvasCenter: Radian = getFromBaseOrDefaultPattern('rotateViewAboutCanvasCenter')

	if (!rotateViewAboutCanvasCenter) {
		return path
	}

	const canvasCenter = to.Pixel([ from.Dimension(canvasSize) * HALF, from.Dimension(canvasSize) * HALF ])

	return path.map(pixel => rotate({
		fixedPoint: canvasCenter,
		point: pixel,
		rotation: rotateViewAboutCanvasCenter,
	}))
}

export { applyTilt }
