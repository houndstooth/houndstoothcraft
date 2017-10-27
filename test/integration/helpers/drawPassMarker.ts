// tslint:disable:no-unsafe-any

import { from } from '../../../src'
import { Canvas } from '../../../src/page/types/Canvas'
import { Context } from '../../../src/page/types/Context'
import { Coordinate } from '../../../src/space'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'

interface DrawPassMarker { coordinateUnderTest: Coordinate, id: number, passed: boolean }

const drawPassMarker: (_: DrawPassMarker) => void = ({ coordinateUnderTest, id, passed }: DrawPassMarker) => {
	let testMarkersCanvas: Canvas = document.querySelector('.test-markers-canvas') || {}
	if (!testMarkersCanvas) {
		testMarkersCanvas = createTestMarkersCanvas()
	}
	const testMarkersContext: Context = testMarkersCanvas.getContext('2d')

	testMarkersContext.strokeStyle = passed ? 'green' : 'red'
	testMarkersContext.beginPath()

	const [ x, y ]: number[] = from.Coordinate(coordinateUnderTest)
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
