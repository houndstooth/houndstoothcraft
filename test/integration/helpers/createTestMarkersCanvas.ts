// tslint:disable:no-unsafe-any

import { Canvas } from '../../../src'

const createTestMarkersCanvas: () => Canvas =
	(): Canvas => {
		// tslint:disable-next-line:no-any
		const testCanvasDisplayArea: any = document.createElement('div')
		testCanvasDisplayArea.setAttribute('id', 'test-canvas-display-area')

		document.body.insertBefore(testCanvasDisplayArea, document.body.firstChild)

		const testMarkersCanvas: Canvas = document.createElement('canvas')
		testMarkersCanvas.setAttribute('id', 'test-markers-canvas')
		testCanvasDisplayArea.appendChild(testMarkersCanvas)

		return testMarkersCanvas
	}

export default createTestMarkersCanvas
