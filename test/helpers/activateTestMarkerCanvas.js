import { CANVAS_SIZE } from '../../src/defaults'
import settingsUtilities from '../../src/utilities/settingsUtilities'

export default () => {
	let testMarkerCanvas = document.querySelector('.testMarkerCanvas')

	testMarkerCanvas.style.position = 'absolute'
	testMarkerCanvas.style.top = 0
	testMarkerCanvas.style.left = 0
	testMarkerCanvas.style.zIndex = 9001

	const testMarkerCanvasSize = settingsUtilities.getFromSettingsOrDefault(
		{ nestedPropertyPath: [ 'initial', 'viewSettings', 'canvasSize' ], defaultForProperty: CANVAS_SIZE }
	)
	testMarkerCanvas.width = testMarkerCanvasSize
	testMarkerCanvas.height = testMarkerCanvasSize

	const canvas = document.querySelector('.realCanvas')
	canvas.style.position = 'absolute'
	canvas.style.top = 0
	canvas.style.left = 0
}
