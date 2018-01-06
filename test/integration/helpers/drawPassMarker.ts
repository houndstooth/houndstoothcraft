import { from } from '../../../src/indexForTest'
import getTestMarkersContext from './getTestMarkersContext'
import { DrawPassMarker } from './types'

const drawPassMarker: (_: DrawPassMarker) => void =
	({ coordinateUnderTest, id, passed }: DrawPassMarker): void => {
		const testMarkersContext: CanvasRenderingContext2D = getTestMarkersContext()

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
