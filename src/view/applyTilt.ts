import { HALF } from '../constants'
import { Dimension } from '../page'
import { Outline, Radian, rotateCoordinateAboutPoint } from '../space'
import { getFromBaseOrDefaultPattern } from '../store'
import * as from from '../utilities/from'
import * as to from '../utilities/to'

const applyTilt: (outline: Outline) => Outline = outline => {
	const canvasSize: Dimension = getFromBaseOrDefaultPattern('canvasSize')
	const rotateViewAboutCanvasCenter: Radian = getFromBaseOrDefaultPattern('rotateViewAboutCanvasCenter')

	if (!rotateViewAboutCanvasCenter) {
		return outline
	}

	const canvasCenter = to.Coordinate([ from.Dimension(canvasSize) * HALF, from.Dimension(canvasSize) * HALF ])

	return outline.map(coordinate => rotateCoordinateAboutPoint({
		coordinate,
		point: canvasCenter,
		rotation: rotateViewAboutCanvasCenter,
	}))
}

export { applyTilt }
