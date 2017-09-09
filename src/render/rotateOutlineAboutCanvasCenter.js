import rotationUtilities from '../utilities/rotationUtilities'
import store from '../../store'

export default outline => {
	const { canvasSize, rotateViewAboutCanvasCenter } = store.mainHoundstooth.basePattern.viewSettings || {}

	if (rotateViewAboutCanvasCenter) {
		outline = rotationUtilities.rotateCoordinatesAboutPoint({
			point: [ canvasSize / 2, canvasSize / 2 ],
			coordinates: outline,
			rotation: rotateViewAboutCanvasCenter,
		})
	}

	return outline
}
