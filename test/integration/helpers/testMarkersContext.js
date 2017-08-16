let testMarkersCanvas = document.querySelector('.test-markers-canvas')

if (!testMarkersCanvas) {
	const testCanvasDisplayArea = document.createElement('div')
	testCanvasDisplayArea.classList.add('test-canvas-display-area')

	document.body.insertBefore(testCanvasDisplayArea, document.body.firstChild)

	testMarkersCanvas = document.createElement('canvas')
	testMarkersCanvas.classList.add('test-markers-canvas')
	testCanvasDisplayArea.appendChild(testMarkersCanvas)
}

export default testMarkersCanvas.getContext('2d')
