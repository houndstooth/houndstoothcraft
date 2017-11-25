// tslint:disable:no-unsafe-any

import { Canvas, Context, from } from '../../../src'
import { buildMockCanvas } from '../../unit'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'
import { DrawPassMarker } from './types'

const drawPassMarker: (_: DrawPassMarker) => void =
	({ coordinateUnderTest, id, passed }: DrawPassMarker): void => {
		// tslint:disable-next-line:max-line-length
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
