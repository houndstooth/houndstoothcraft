import { CANVAS_SIZE } from '../../src/defaults'
import codeUtilities from '../../src/utilities/codeUtilities'

let testMarkerCanvas = document.querySelector('.testMarkerCanvas')

if (!testMarkerCanvas) {
	const place = document.createElement('div')
	place.classList.add('place')
	place.style.height = '800px'
	document.body.insertBefore( place, document.body.firstChild );

	testMarkerCanvas = document.createElement('canvas')
	testMarkerCanvas.classList.add('testMarkerCanvas')
	testMarkerCanvas.style.position = 'absolute'
	testMarkerCanvas.style.top = 0
	testMarkerCanvas.style.left = 0
	testMarkerCanvas.style.zIndex = 9001
	let testMarkerCanvasSize
	if (current.settings.initial.viewSettings && codeUtilities.isDefined(current.settings.initial.viewSettings.canvasSize)) {
		testMarkerCanvasSize = current.settings.initial.viewSettings.canvasSize
	}
	else {
		testMarkerCanvasSize = CANVAS_SIZE
	}
	testMarkerCanvas.width = testMarkerCanvasSize
	testMarkerCanvas.height = testMarkerCanvasSize
	place.appendChild(testMarkerCanvas)

	const canvas = document.querySelector('.realCanvas')
	canvas.style.position = 'absolute'
	canvas.style.top = 0
	canvas.style.left = 0
}

export default testMarkerCanvas
