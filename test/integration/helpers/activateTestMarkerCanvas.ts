// tslint:disable:no-any

import { createCanvasContainer } from '../../../src/page/createCanvasContainer'
import { scaleElement } from '../../../src/page/scaleElement'
import { state } from '../../../src/state'
import { getFromBaseOrDefaultPattern } from '../../../src/store/getFromBaseOrDefaultPattern'
import { isEmpty } from '../../../src/utilities/codeUtilities'
import * as to from '../../../src/utilities/to'
import { NullarySideEffector } from '../../../src/utilities/types'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'
import { testMarkersClear } from './testMarkersClear'

const prepareCanvasForDisplayInTest: (canvas: any) => void = canvas => {
	canvas.style.display = 'block'
	canvas.style.position = 'absolute'
	canvas.style.top = '0'
	canvas.style.left = '0'
}

const activateTestMarkerCanvas: NullarySideEffector = () => {
	testMarkersClear()

	let testMarkersCanvas: any = document.querySelector('.test-markers-canvas') || {}
	if (isEmpty(testMarkersCanvas)) {
		testMarkersCanvas = createTestMarkersCanvas()
	}

	prepareCanvasForDisplayInTest(testMarkersCanvas)
	testMarkersCanvas.style.zIndex = '9001'

	const canvasSize = getFromBaseOrDefaultPattern('canvasSize')
	testMarkersCanvas.width = canvasSize
	testMarkersCanvas.height = canvasSize

	const testCanvasDisplayArea: any = document.querySelector('.test-canvas-display-area') || {}
	if (testCanvasDisplayArea.style) {
		testCanvasDisplayArea.style.display = 'block'
	}

	scaleElement({ element: testCanvasDisplayArea, dimensions: to.Dimensions([ canvasSize, canvasSize ]) })

	let canvasContainer: any = document.querySelector('.canvas-container') || {}
	if (isEmpty(canvasContainer)) {
		canvasContainer = createCanvasContainer()
	}

	prepareCanvasForDisplayInTest(canvasContainer)

	state.mixingDown = true
}

export { activateTestMarkerCanvas }
