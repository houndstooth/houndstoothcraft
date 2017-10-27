import { Canvas } from '../../../src/page/types/Canvas'

const createTestMarkersCanvas: () => Canvas =
	(): Canvas => {
		// tslint:disable:no-any
		const testCanvasDisplayArea: any = document.createElement('div')
		// tslint:disable:no-unsafe-any
		testCanvasDisplayArea.classList.add('test-canvas-display-area')

		document.body.insertBefore(testCanvasDisplayArea, document.body.firstChild)

		const testMarkersCanvas: Canvas = document.createElement('canvas')
		testMarkersCanvas.classList.add('test-markers-canvas')
		testCanvasDisplayArea.appendChild(testMarkersCanvas)

		return testMarkersCanvas
	}

export { createTestMarkersCanvas }
