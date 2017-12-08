// tslint:disable:no-any no-unsafe-any max-line-length

import {
	constants,
	NullarySideEffector,
	scaleElement,
	storeMixedDownContext,
	from,
	to,
} from '../../../src'
import createTestMarkersCanvas from './createTestMarkersCanvas'
import testMarkersClear from './testMarkersClear'

const activateTestMarkerCanvas: NullarySideEffector =
	(): void => {
		const { CANVAS_SIZE } = constants

		testMarkersClear()

		const testMarkersCanvas: HTMLCanvasElement = document.querySelector('#test-markers-canvas') as HTMLCanvasElement || createTestMarkersCanvas()
		testMarkersCanvas.style.position = 'absolute'
		testMarkersCanvas.style.zIndex = '9001'
		testMarkersCanvas.width = from.Px(CANVAS_SIZE)
		testMarkersCanvas.height = from.Px(CANVAS_SIZE)

		const testCanvasDisplayArea: HTMLElement = document.querySelector('#test-canvas-display-area') as HTMLElement || document.createElement('div')
		if (testCanvasDisplayArea.style) {
			testCanvasDisplayArea.style.display = 'block'
			scaleElement.default({ element: testCanvasDisplayArea, dimensions: to.Dimensions([ CANVAS_SIZE, CANVAS_SIZE ]) })
		}

		const canvasContainer: HTMLElement = document.querySelector('#canvas-container') as HTMLElement || document.createElement('div')
		canvasContainer.setAttribute('id', 'canvas-container')
		canvasContainer.style.position = 'absolute'
		testCanvasDisplayArea.appendChild(canvasContainer)
		scaleElement.default({ element: canvasContainer, dimensions: to.Dimensions([ CANVAS_SIZE, CANVAS_SIZE ]) })

		const mixedDownCanvas: HTMLCanvasElement = document.querySelector('#mixed-down-canvas') as HTMLCanvasElement || document.createElement('canvas')
		mixedDownCanvas.setAttribute('id', 'mixed-down-canvas')
		testCanvasDisplayArea.appendChild(mixedDownCanvas)
		storeMixedDownContext.default()
	}

export default activateTestMarkerCanvas
