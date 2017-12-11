// tslint:disable:no-unsafe-any

import { from } from '../../../src/indexForTest'
import createTestMarkersCanvas from './createTestMarkersCanvas'
import { DrawPassMarker } from './types'

const drawPassMarker: (_: DrawPassMarker) => void =
	({ coordinateUnderTest, id, passed }: DrawPassMarker): void => {
		// tslint:disable-next-line:max-line-length
		let testMarkersCanvas: HTMLCanvasElement = document.querySelector('#test-markers-canvas') as HTMLCanvasElement
		if (!testMarkersCanvas) {
			testMarkersCanvas = createTestMarkersCanvas()
		}
		const testMarkersContext: CanvasRenderingContext2D = testMarkersCanvas.getContext('2d') as CanvasRenderingContext2D

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

export default drawPassMarker
