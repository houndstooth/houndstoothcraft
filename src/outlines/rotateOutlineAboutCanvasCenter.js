import rotateOutlineAboutPoint from './rotateOutlineAboutPoint'
import store from '../../store'

export default outline => {
	const { canvasSize, rotateViewAboutCanvasCenter } = store.mainHoundstooth.basePattern.viewSettings || {}

	if (rotateViewAboutCanvasCenter) {
		outline = rotateOutlineAboutPoint({
			point: [ canvasSize / 2, canvasSize / 2 ],
			outline,
			rotation: rotateViewAboutCanvasCenter,
		})
	}

	return outline
}
