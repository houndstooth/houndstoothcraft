import { HALF } from '../constants'
import { Coordinate, Outline, rotateCoordinateAboutPoint } from '../space'
import state from '../state'

const applyTilt: (outline: Outline) => Outline = outline => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const viewSettings = basePattern.viewSettings || {}
	const { canvasSize, rotateViewAboutCanvasCenter } = viewSettings

	if (!rotateViewAboutCanvasCenter) {
		return outline
	}

	const canvasCenter = [ canvasSize as number * HALF as any, canvasSize as number * HALF as any ] as Coordinate

	return outline.map(coordinate => rotateCoordinateAboutPoint({
		coordinate,
		point: canvasCenter,
		rotation: rotateViewAboutCanvasCenter as any,
	}))
}

export default applyTilt
