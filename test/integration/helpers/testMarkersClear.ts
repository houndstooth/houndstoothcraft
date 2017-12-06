import { Canvas, codeUtilities, constants, Context, NullarySideEffector } from '../../../src'
import { buildMockCanvas } from '../../unit'
import createTestMarkersCanvas from './createTestMarkersCanvas'

const testMarkersClear: NullarySideEffector =
	(): void => {
		// tslint:disable-next-line:max-line-length
		let testMarkersCanvas: Canvas = document.querySelector('#test-markers-canvas') as HTMLCanvasElement || buildMockCanvas()
		if (codeUtilities.isEmpty(testMarkersCanvas)) {
			testMarkersCanvas = createTestMarkersCanvas()
		}
		// tslint:disable-next-line:no-unsafe-any
		const testMarkersContext: Context = testMarkersCanvas.getContext('2d')

		// tslint:disable-next-line:no-unsafe-any
		testMarkersContext.clearRect(0, 0, constants.CANVAS_SIZE, constants.CANVAS_SIZE)
	}

export default testMarkersClear
