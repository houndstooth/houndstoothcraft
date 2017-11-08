// tslint:disable:no-any no-unsafe-any

import { scaleCanvasContainer } from '../../../src/app/page/scaleCanvasContainer'
import { scaleElement } from '../../../src/app/page/scaleElement'
import { Canvas, PageElement, Px } from '../../../src/app/page/types'
import { getFromBaseOrDefaultPattern } from '../../../src/app/store/getFromBaseOrDefaultPattern'
import { state } from '../../../src/state'
import * as to from '../../../src/to'
import { NullarySideEffector } from '../../../src/utilities/types'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'
import { testMarkersClear } from './testMarkersClear'

const prepareCanvasForDisplayInTest: (canvas: Canvas | PageElement) => void =
	(canvas: Canvas | PageElement): void => {
		canvas.style.display = 'block'
		canvas.style.position = 'absolute'
		canvas.style.top = '0'
		canvas.style.left = '0'
	}

const activateTestMarkerCanvas: NullarySideEffector =
	(): void => {
		testMarkersClear()

		// tslint:disable-next-line:max-line-length
		const testMarkersCanvas: Canvas = document.querySelector('.test-markers-canvas') as HTMLCanvasElement || createTestMarkersCanvas()

		prepareCanvasForDisplayInTest(testMarkersCanvas)
		testMarkersCanvas.style.zIndex = '9001'

		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')
		testMarkersCanvas.width = canvasSize
		testMarkersCanvas.height = canvasSize

		// tslint:disable-next-line:max-line-length
		const testCanvasDisplayArea: PageElement = document.querySelector('.test-canvas-display-area') as HTMLElement || {}
		if (testCanvasDisplayArea.style) {
			testCanvasDisplayArea.style.display = 'block'
			scaleElement({ element: testCanvasDisplayArea, dimensions: to.Dimensions([ canvasSize, canvasSize ]) })
		}

		const canvasContainer: PageElement = document.createElement('div')
		canvasContainer.setAttribute('id', 'canvas-container')
		testCanvasDisplayArea.appendChild(canvasContainer)
		scaleCanvasContainer()

		prepareCanvasForDisplayInTest(canvasContainer)

		state.mixingDown = true
	}

export { activateTestMarkerCanvas }
