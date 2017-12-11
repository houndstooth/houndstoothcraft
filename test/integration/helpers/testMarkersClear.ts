import { codeUtilities, constants, from, NullarySideEffector } from '../../../src/indexForTest'
import createTestMarkersCanvas from './createTestMarkersCanvas'

const testMarkersClear: NullarySideEffector =
	(): void => {
		// tslint:disable-next-line:max-line-length
		let testMarkersCanvas: HTMLCanvasElement | undefined = document.querySelector('#test-markers-canvas') as HTMLCanvasElement | undefined
		if (testMarkersCanvas && codeUtilities.isEmpty(testMarkersCanvas)) {
			testMarkersCanvas = createTestMarkersCanvas()
		}

		if (testMarkersCanvas) {
			// tslint:disable-next-line:no-unsafe-any
			const testMarkersContext: CanvasRenderingContext2D = testMarkersCanvas.getContext('2d') as CanvasRenderingContext2D

			// tslint:disable-next-line:no-unsafe-any
			testMarkersContext.clearRect(0, 0, from.Px(constants.CANVAS_SIZE), from.Px(constants.CANVAS_SIZE))
		}
	}

export default testMarkersClear
