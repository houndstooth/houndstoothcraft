// tslint:disable:no-unsafe-any

const createTestMarkersCanvas: () => HTMLCanvasElement =
	(): HTMLCanvasElement => {
		// tslint:disable-next-line:no-any
		const testCanvasDisplayArea: any = document.createElement('div')
		testCanvasDisplayArea.setAttribute('id', 'test-canvas-display-area')

		document.body.insertBefore(testCanvasDisplayArea, document.body.firstChild)

		const testMarkersCanvas: HTMLCanvasElement = document.createElement('canvas')
		testMarkersCanvas.setAttribute('id', 'test-markers-canvas')
		testCanvasDisplayArea.appendChild(testMarkersCanvas)

		return testMarkersCanvas
	}

export default createTestMarkersCanvas
