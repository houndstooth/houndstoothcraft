import state from '../../../src/state'
import scaleElement from '../../../src/page/scaleElement'
import getCanvasDimensions from '../../../src/canvas/getCanvasDimensions'
import createCanvasContainer from '../../../src/page/createCanvasContainer'
import testMarkersClear from './testMarkersClear'
import createTestMarkersCanvas from './createTestMarkersCanvas'
import { NullarySideEffector } from '../../../src/utilities/types'
import Dimensions from '../../../src/page/types/Dimensions'

const prepareCanvasForDisplayInTest: { (canvas: HTMLCanvasElement): void } = canvas => {
	canvas.style.display = 'block'
	canvas.style.position = 'absolute'
	canvas.style.top = '0'
	canvas.style.left = '0'
}

const activateTestMarkersCanvas: NullarySideEffector = (() => {
	testMarkersClear()

	let testMarkersCanvas = document.querySelector('.test-markers-canvas') as HTMLCanvasElement
	if (!testMarkersCanvas) {
		testMarkersCanvas = createTestMarkersCanvas()
	}

	prepareCanvasForDisplayInTest(testMarkersCanvas)
	testMarkersCanvas.style.zIndex = '9001'

	const canvasDimensions = getCanvasDimensions() as Dimensions
	testMarkersCanvas.width = canvasDimensions[ 0 ]
	testMarkersCanvas.height = canvasDimensions[ 1 ]

	const testCanvasDisplayArea = document.querySelector('.test-canvas-display-area') as HTMLElement
	testCanvasDisplayArea.style.display = 'block'

	scaleElement({ element: testCanvasDisplayArea, dimensions: canvasDimensions })

	const existingCanvasContainer = document.querySelector('.canvas-container')
	const canvasContainer = existingCanvasContainer || createCanvasContainer({ canvasDimensions })
	prepareCanvasForDisplayInTest(canvasContainer)

	state.mixingDown = true
}) as NullarySideEffector

export default activateTestMarkersCanvas
