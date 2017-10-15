import { rotateCoordinateAboutPoint, Outline, Coordinate } from '../space'
import state from '../state'

const applyTilt: {(outline: Outline): Outline } = outline => {
	const viewSettings = state.mainHoundstooth.basePattern.viewSettings || {}
	const { canvasSize, rotateViewAboutCanvasCenter } = viewSettings

	if (!rotateViewAboutCanvasCenter) {
		return outline
	}

	const point = [ canvasSize as number / 2 as any, canvasSize as number / 2 as any ] as Coordinate

	return outline.map(coordinate => rotateCoordinateAboutPoint({
		point,
		coordinate,
		rotation: rotateViewAboutCanvasCenter,
	}))
}

export default applyTilt
