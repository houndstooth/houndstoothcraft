import getCanvasDimensions from '../../../src/canvas/getCanvasDimensions'
import createCanvasContainer from '../../../src/page/createCanvasContainer'
import scaleElement from '../../../src/page/scaleElement'
import Canvas from '../../../src/page/types/Canvas'
import PageElement from '../../../src/page/types/PageElement'
import state from '../../../src/state'
import { NullarySideEffector } from '../../../src/utilities/types'
import createTestMarkersCanvas from './createTestMarkersCanvas'
import testMarkersClear from './testMarkersClear'

const prepareCanvasForDisplayInTest: (canvas: Canvas) => void = canvas => {
	canvas.style.display = 'block'
	canvas.style.position = 'absolute'
	canvas.style.top = '0'
	canvas.style.left = '0'
}

const activateTestMarkerCanvas: NullarySideEffector = (() => {
	testMarkersClear()

	let testMarkersCanvas = document.querySelector('.test-markers-canvas') as Canvas
	if (!testMarkersCanvas) {
		testMarkersCanvas = createTestMarkersCanvas()
	}

	prepareCanvasForDisplayInTest(testMarkersCanvas)
	testMarkersCanvas.style.zIndex = '9001'

	const canvasDimensions = getCanvasDimensions()
	testMarkersCanvas.width = canvasDimensions[ 0 ]
	testMarkersCanvas.height = canvasDimensions[ 1 ]

	const testCanvasDisplayArea = document.querySelector('.test-canvas-display-area') as PageElement
	testCanvasDisplayArea.style.display = 'block'

	scaleElement({ element: testCanvasDisplayArea, dimensions: canvasDimensions })

	const existingCanvasContainer = document.querySelector('.canvas-container') as PageElement
	const canvasContainer = existingCanvasContainer || createCanvasContainer({ canvasDimensions })
	prepareCanvasForDisplayInTest(canvasContainer)

	state.mixingDown = true
}) as NullarySideEffector

export default activateTestMarkerCanvas
