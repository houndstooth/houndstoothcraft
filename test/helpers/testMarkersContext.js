let testMarkersCanvas = document.querySelector('.testMarkersCanvas')

if (!testMarkersCanvas) {
	const testCanvasDisplayArea = document.createElement('div')
	testCanvasDisplayArea.classList.add('testCanvasDisplayArea')

	document.body.insertBefore(testCanvasDisplayArea, document.body.firstChild)

	testMarkersCanvas = document.createElement('canvas')
	testMarkersCanvas.classList.add('testMarkersCanvas')
	testCanvasDisplayArea.appendChild(testMarkersCanvas)
}

export default testMarkersCanvas.getContext('2d')
