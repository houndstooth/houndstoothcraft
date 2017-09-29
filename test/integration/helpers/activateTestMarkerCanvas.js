import setElementDimensions from '../../../src/page/setElementDimensions'
import getCanvasSize from '../../../src/canvas/getCanvasSize'
import createCanvasContainer from '../../../src/page/createCanvasContainer'
import testMarkersClear from './testMarkersClear'
import createTestMarkersCanvas from './createTestMarkersCanvas'
import state from '../../../src/state'

const prepareCanvasForDisplayInTest = canvas => {
	canvas.style.display = 'block'
	canvas.style.position = 'absolute'
	canvas.style.top = 0
	canvas.style.left = 0
}

export default () => {
	testMarkersClear()

	let testMarkersCanvas = document.querySelector('.test-markers-canvas') || createTestMarkersCanvas()

	prepareCanvasForDisplayInTest(testMarkersCanvas)
	testMarkersCanvas.style.zIndex = 9001

	const canvasSize = getCanvasSize()
	testMarkersCanvas.width = canvasSize[ 0 ]
	testMarkersCanvas.height = canvasSize[ 1 ]

	const testCanvasDisplayArea = document.querySelector('.test-canvas-display-area')
	testCanvasDisplayArea.style.display = 'block'

	setElementDimensions(testCanvasDisplayArea, canvasSize)

	let canvasContainer = document.querySelector('.canvas-container') || createCanvasContainer({ canvasSize })
	prepareCanvasForDisplayInTest(canvasContainer)

	state.mixingDown = true
}
