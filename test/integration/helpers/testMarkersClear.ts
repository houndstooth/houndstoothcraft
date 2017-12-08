import { codeUtilities, constants, from, NullarySideEffector } from '../../../src'
import { buildMockCanvas } from '../../helpers'
import createTestMarkersCanvas from './createTestMarkersCanvas'

const testMarkersClear: NullarySideEffector =
	(): void => {
		// tslint:disable-next-line:max-line-length
		let testMarkersCanvas: HTMLCanvasElement = document.querySelector('#test-markers-canvas') as HTMLCanvasElement || buildMockCanvas()
		if (codeUtilities.isEmpty(testMarkersCanvas)) {
			testMarkersCanvas = createTestMarkersCanvas()
		}
		// tslint:disable-next-line:no-unsafe-any
		const testMarkersContext: CanvasRenderingContext2D = testMarkersCanvas.getContext('2d') as CanvasRenderingContext2D

		// tslint:disable-next-line:no-unsafe-any
		testMarkersContext.clearRect(0, 0, from.Px(constants.CANVAS_SIZE), from.Px(constants.CANVAS_SIZE))
	}

export default testMarkersClear
