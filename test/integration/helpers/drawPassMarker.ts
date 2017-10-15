import createTestMarkersCanvas from './createTestMarkersCanvas'
import { Coordinate } from '../../../src/space'
import Canvas from '../../../src/page/types/Canvas'

const drawPassMarker: {
	({}: { passed: boolean, coordinateUnderTest: Coordinate, id: number }): void,
} = ({ passed, coordinateUnderTest, id }) => {
	let testMarkersCanvas = document.querySelector('.test-markers-canvas') as Canvas
	if (!testMarkersCanvas) {
		testMarkersCanvas = createTestMarkersCanvas()
	}
	const testMarkersContext = testMarkersCanvas.getContext('2d')

	testMarkersContext.strokeStyle = passed ? 'green' : 'red'
	testMarkersContext.beginPath()

	const x = coordinateUnderTest[0] as any
	const y = coordinateUnderTest[1] as any
	testMarkersContext.arc(x, y, 2, 0, 2 * Math.PI)

	testMarkersContext.closePath()
	testMarkersContext.stroke()

	if (!passed) {
		testMarkersContext.font = '8px Arial'
		testMarkersContext.fillStyle = 'red'
		testMarkersContext.fillText(id.toString(), x + 3, y + 3)
	}
}

export default drawPassMarker
