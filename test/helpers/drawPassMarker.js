import testMarkersContext from './testMarkersContext'

export default (passed, coordinate, id) => {
	testMarkersContext.strokeStyle = passed ? 'green' : 'red'
	testMarkersContext.beginPath()

	testMarkersContext.arc(coordinate[ 0 ], coordinate[ 1 ], 2, 0, 2 * Math.PI)

	testMarkersContext.closePath()
	testMarkersContext.stroke()

	if (!passed) {
		testMarkersContext.font = '8px Arial'
		testMarkersContext.fillStyle = 'red'
		testMarkersContext.fillText(id, coordinate[ 0 ] + 3, coordinate[ 1 ] + 3)
	}
}
