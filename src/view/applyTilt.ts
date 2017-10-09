import { rotateCoordinateAboutPoint } from '../space'
import state from '../state'

const applyTilt = outline => {
	const {
		canvasSize,
		rotateViewAboutCanvasCenter,
	} : {
		canvasSize,
		rotateViewAboutCanvasCenter
		} = state.mainHoundstooth.basePattern.viewSettings || {}

	if (!rotateViewAboutCanvasCenter) {
		return outline
	}

	const point = [ canvasSize / 2, canvasSize / 2 ]
	return outline.map(coordinate => rotateCoordinateAboutPoint({
		point,
		coordinate,
		rotation: rotateViewAboutCanvasCenter,
	}))
}

export default applyTilt
