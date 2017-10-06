import createTestMarkersCanvas from './createTestMarkersCanvas'

const drawPassMarker = ({ passed, coordinateUnderTest, id }) => {
	const testMarkersCanvas = document.querySelector('.test-markers-canvas') || createTestMarkersCanvas()
	const testMarkersContext = testMarkersCanvas.getContext('2d')

	testMarkersContext.strokeStyle = passed ? 'green' : 'red'
	testMarkersContext.beginPath()

	testMarkersContext.arc(coordinateUnderTest[ 0 ], coordinateUnderTest[ 1 ], 2, 0, 2 * Math.PI)

	testMarkersContext.closePath()
	testMarkersContext.stroke()

	if (!passed) {
		testMarkersContext.font = '8px Arial'
		testMarkersContext.fillStyle = 'red'
		testMarkersContext.fillText(id, coordinateUnderTest[ 0 ] + 3, coordinateUnderTest[ 1 ] + 3)
	}
}

export default drawPassMarker
