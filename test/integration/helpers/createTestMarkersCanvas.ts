const createTestMarkersCanvas: { (): HTMLCanvasElement } = () => {
	const testCanvasDisplayArea = document.createElement('div')
	testCanvasDisplayArea.classList.add('test-canvas-display-area')

	document.body.insertBefore(testCanvasDisplayArea, document.body.firstChild)

	const testMarkersCanvas = document.createElement('canvas')
	testMarkersCanvas.classList.add('test-markers-canvas')
	testCanvasDisplayArea.appendChild(testMarkersCanvas)

	return testMarkersCanvas
}

export default createTestMarkersCanvas
