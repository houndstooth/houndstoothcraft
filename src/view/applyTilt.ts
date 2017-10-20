import { HALF } from '../constants'
import { Coordinate, Outline, rotateCoordinateAboutPoint } from '../space'
import { state } from '../state'

const applyTilt: (outline: Outline) => Outline = outline => {
	const { canvasSize, rotateViewAboutCanvasCenter } = state.mainHoundstooth.basePattern.viewSettings

	if (!rotateViewAboutCanvasCenter) {
		return outline
	}

	const canvasCenter = [ canvasSize as number * HALF as any, canvasSize as number * HALF as any ] as Coordinate

	return outline.map(coordinate => rotateCoordinateAboutPoint({
		coordinate,
		point: canvasCenter,
		rotation: rotateViewAboutCanvasCenter,
	}))
}

export { applyTilt }
