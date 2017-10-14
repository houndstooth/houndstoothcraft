import { rotateCoordinateAboutPoint, Outline, Coordinate } from '../space'
import state from '../state'

const applyTilt: {(outline: Outline): Outline } = outline => {
	const {
		canvasSize,
		rotateViewAboutCanvasCenter,
	}: {
		canvasSize,
		rotateViewAboutCanvasCenter,
		} = state.mainHoundstooth.basePattern.viewSettings || {}

	if (!rotateViewAboutCanvasCenter) {
		return outline
	}

	const point = [ canvasSize / 2, canvasSize / 2 ] as Coordinate
	return outline.map(coordinate => rotateCoordinateAboutPoint({
		point,
		coordinate,
		rotation: rotateViewAboutCanvasCenter,
	}))
}

export default applyTilt
