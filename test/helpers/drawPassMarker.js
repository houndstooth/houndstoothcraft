import testContext from './testContext'

export default (passed, coordinate, id) => {
	testContext.strokeStyle = passed ? 'green' : 'red'
	testContext.beginPath()

	testContext.arc(coordinate[0], coordinate[1], 2, 0, 2 * Math.PI)

	testContext.closePath()
	testContext.stroke()

	if (!passed) {
		testContext.font = "8px Arial"
		testContext.fillStyle = 'red'
		testContext.fillText(id, coordinate[0] + 3, coordinate[1] + 3)
	}
}
