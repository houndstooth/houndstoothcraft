import space from '../space'
import state from '../../state'

export default outline => {
	const { canvasSize, rotateViewAboutCanvasCenter } = state.mainHoundstooth.basePattern.viewSettings || {}

	if (!rotateViewAboutCanvasCenter) return outline

	const point = [ canvasSize / 2, canvasSize / 2 ]
	return outline.map(coordinate => space.rotateCoordinateAboutPoint({
		point,
		coordinate,
		rotation: rotateViewAboutCanvasCenter,
	}))
}
