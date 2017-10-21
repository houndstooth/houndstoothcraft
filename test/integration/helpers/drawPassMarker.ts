import { from } from '../../../src'
import { Canvas } from '../../../src/page/types/Canvas'
import { Coordinate } from '../../../src/space'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'

const drawPassMarker: (_: {
	coordinateUnderTest: Coordinate, id: number, passed: boolean,
}) => void = ({ coordinateUnderTest, id, passed }) => {
	let testMarkersCanvas: Canvas = document.querySelector('.test-markers-canvas') || {}
	if (!testMarkersCanvas) {
		testMarkersCanvas = createTestMarkersCanvas()
	}
	const testMarkersContext = testMarkersCanvas.getContext('2d')

	testMarkersContext.strokeStyle = passed ? 'green' : 'red'
	testMarkersContext.beginPath()

	const x = from.Units(coordinateUnderTest[0])
	const y = from.Units(coordinateUnderTest[1])
	testMarkersContext.arc(x, y, 2, 0, Math.PI * 2)

	testMarkersContext.closePath()
	testMarkersContext.stroke()

	if (!passed) {
		testMarkersContext.font = '8px Arial'
		testMarkersContext.fillStyle = 'red'
		testMarkersContext.fillText(id.toString(), x + 3, y + 3)
	}
}

export { drawPassMarker }
