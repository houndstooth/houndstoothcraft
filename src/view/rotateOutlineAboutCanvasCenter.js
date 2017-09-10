import outlines from '../outlines'
import state from '../../state'

export default outline => {
	const { canvasSize, rotateViewAboutCanvasCenter } = state.mainHoundstooth.basePattern.viewSettings || {}

	if (rotateViewAboutCanvasCenter) {
		outline = outlines.rotateOutlineAboutPoint({
			point: [ canvasSize / 2, canvasSize / 2 ],
			outline,
			rotation: rotateViewAboutCanvasCenter,
		})
	}

	return outline
}
