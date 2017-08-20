import interfaceUtilities from '../../../src/utilities/interfaceUtilities'
import getCanvasSize from '../../../src/render/getCanvasSize'

const prepareCanvasForDisplayInTest = canvas => {
	canvas.style.display = 'block'
	canvas.style.position = 'absolute'
	canvas.style.top = 0
	canvas.style.left = 0
}

export default () => {
	let testMarkersCanvas = document.querySelector('.test-markers-canvas')

	prepareCanvasForDisplayInTest(testMarkersCanvas)
	testMarkersCanvas.style.zIndex = 9001

	const canvasSize = getCanvasSize()
	testMarkersCanvas.width = canvasSize[ 0 ]
	testMarkersCanvas.height = canvasSize[ 1 ]

	const testCanvasDisplayArea = document.querySelector('.test-canvas-display-area')
	testCanvasDisplayArea.style.display = 'block'

	interfaceUtilities.setElementDimensions(testCanvasDisplayArea, canvasSize)

	let canvas = document.querySelector('.mixed-down-canvas')
	prepareCanvasForDisplayInTest(canvas)

	let canvasContainer = document.querySelector('.canvas-container')
	prepareCanvasForDisplayInTest(canvasContainer)
}
