import { createCanvasContainer } from '../../../src/page/createCanvasContainer'
import { scaleElement } from '../../../src/page/scaleElement'
import { Canvas } from '../../../src/page/types/Canvas'
import { PageElement } from '../../../src/page/types/PageElement'
import { state } from '../../../src/state'
import { defaults } from '../../../src/store'
import { isEmpty } from '../../../src/utilities/codeUtilities'
import { NullarySideEffector } from '../../../src/utilities/types'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'
import { testMarkersClear } from './testMarkersClear'

const prepareCanvasForDisplayInTest: (canvas: Canvas) => void = canvas => {
	canvas.style.display = 'block'
	canvas.style.position = 'absolute'
	canvas.style.top = '0'
	canvas.style.left = '0'
}

const activateTestMarkerCanvas: NullarySideEffector = () => {
	testMarkersClear()

	let testMarkersCanvas: Canvas = document.querySelector('.test-markers-canvas') || {}
	if (isEmpty(testMarkersCanvas)) {
		testMarkersCanvas = createTestMarkersCanvas()
	}

	prepareCanvasForDisplayInTest(testMarkersCanvas)
	testMarkersCanvas.style.zIndex = '9001'

	const { canvasSize = defaults.DEFAULT_CANVAS_SIZE } = state.mainHoundstooth.basePattern.viewSettings || {}
	testMarkersCanvas.width = canvasSize
	testMarkersCanvas.height = canvasSize

	const testCanvasDisplayArea: PageElement = document.querySelector('.test-canvas-display-area') || {}
	if (testCanvasDisplayArea.style) {
		testCanvasDisplayArea.style.display = 'block'
	}

	scaleElement({ element: testCanvasDisplayArea, dimensions: [ canvasSize, canvasSize ] })

	let canvasContainer: PageElement = document.querySelector('.canvas-container') || {}
	if (isEmpty(canvasContainer)) {
		canvasContainer = createCanvasContainer()
	}

	prepareCanvasForDisplayInTest(canvasContainer)

	state.mixingDown = true
}

export { activateTestMarkerCanvas }
