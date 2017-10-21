import { HALF } from '../constants'
import { Outline, rotateCoordinateAboutPoint } from '../space'
import { state } from '../state'
import * as to from '../to'

const applyTilt: (outline: Outline) => Outline = outline => {
	const { canvasSize, rotateViewAboutCanvasCenter } = state.mainHoundstooth.basePattern.viewSettings

	if (!rotateViewAboutCanvasCenter) {
		return outline
	}

	const canvasCenter = to.Coordinate([ canvasSize * HALF, canvasSize * HALF ])

	return outline.map(coordinate => rotateCoordinateAboutPoint({
		coordinate,
		point: canvasCenter,
		rotation: rotateViewAboutCanvasCenter,
	}))
}

export { applyTilt }
