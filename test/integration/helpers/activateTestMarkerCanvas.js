import setElementDimensions from '../../../src/display/setElementDimensions'
import getCanvasSize from '../../../src/display/getCanvasSize'
import setupCanvasContainer from '../../../src/display/setupCanvasContainer'
import testMarkersClear from './testMarkersClear'
import setupTestMarkersCanvas from './setupTestMarkersCanvas'
import setupMixedDownCanvas from '../../../src/display/setupMixedDownCanvas'
import state from '../../../state'

const prepareCanvasForDisplayInTest = canvas => {
	canvas.style.display = 'block'
	canvas.style.position = 'absolute'
	canvas.style.top = 0
	canvas.style.left = 0
}

export default () => {
	testMarkersClear()

	let testMarkersCanvas = document.querySelector('.test-markers-canvas') || setupTestMarkersCanvas()

	prepareCanvasForDisplayInTest(testMarkersCanvas)
	testMarkersCanvas.style.zIndex = 9001

	const canvasSize = getCanvasSize()
	testMarkersCanvas.width = canvasSize[ 0 ]
	testMarkersCanvas.height = canvasSize[ 1 ]

	const testCanvasDisplayArea = document.querySelector('.test-canvas-display-area')
	testCanvasDisplayArea.style.display = 'block'

	setElementDimensions(testCanvasDisplayArea, canvasSize)

	let canvasContainer = document.querySelector('.canvas-container') || setupCanvasContainer()
	prepareCanvasForDisplayInTest(canvasContainer)

	setupMixedDownCanvas()
	state.mixingDown = true
}
