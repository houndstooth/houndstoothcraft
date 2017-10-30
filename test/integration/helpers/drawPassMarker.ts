// tslint:disable:no-unsafe-any

import { from } from '../../../src'
import { Canvas, Context } from '../../../src/page'
import { Coordinate } from '../../../src/space'
import { buildMockCanvas } from '../../unit/helpers/buildMockCanvas'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'

interface DrawPassMarker {
	readonly coordinateUnderTest: Coordinate,
	readonly id: number,
	readonly passed: boolean,
}

const drawPassMarker: (_: DrawPassMarker) => void =
	({ coordinateUnderTest, id, passed }: DrawPassMarker): void => {
		let testMarkersCanvas: Canvas = document.querySelector('.test-markers-canvas') as HTMLCanvasElement || buildMockCanvas()
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
