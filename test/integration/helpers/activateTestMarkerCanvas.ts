import { createCanvasContainer } from '../../../src/page/createCanvasContainer'
import { scaleElement } from '../../../src/page/scaleElement'
import { Canvas } from '../../../src/page/types/Canvas'
import { PageElement } from '../../../src/page/types/PageElement'
import { Px } from '../../../src/page/types/Px'
import { state } from '../../../src/state'
import { getFromBaseOrDefaultPattern } from '../../../src/store/getFromBaseOrDefaultPattern'
import { isEmpty } from '../../../src/utilities/codeUtilities'
import * as to from '../../../src/utilities/to'
import { NullarySideEffector } from '../../../src/utilities/types/NullarySideEffector'
import { buildMockElement } from '../../unit/helpers/buildMockElement'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'
import { testMarkersClear } from './testMarkersClear'

const prepareCanvasForDisplayInTest: (canvas: Canvas) => void = (canvas: Canvas) => {
	if (canvas.style) {
		canvas.style.display = 'block'
		canvas.style.position = 'absolute'
		canvas.style.top = '0'
		canvas.style.left = '0'
	}
}

const activateTestMarkerCanvas: NullarySideEffector = () => {
	testMarkersClear()

	let testMarkersCanvas: Canvas = document.querySelector('.test-markers-canvas') || {}
	if (isEmpty(testMarkersCanvas)) {
		testMarkersCanvas = createTestMarkersCanvas()
	}

	prepareCanvasForDisplayInTest(testMarkersCanvas)
	if (testMarkersCanvas.style) {
		testMarkersCanvas.style.zIndex = '8001'
	}

	const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')
	testMarkersCanvas.width = canvasSize
	testMarkersCanvas.height = canvasSize

	// tslint:disable-next-line:max-line-length
	const testCanvasDisplayArea: PageElement = document.querySelector('.test-canvas-display-area') || buildMockElement()
	if (testCanvasDisplayArea.style) {
		testCanvasDisplayArea.style.display = 'block'
	}

	scaleElement({ element: testCanvasDisplayArea, dimensions: to.Dimensions([ canvasSize, canvasSize ]) })

	let canvasContainer: PageElement = document.querySelector('.canvas-container') || buildMockElement()
	if (isEmpty(canvasContainer)) {
		canvasContainer = createCanvasContainer()
	}

	prepareCanvasForDisplayInTest(canvasContainer)

	state.mixingDown = true
}

export { activateTestMarkerCanvas }
