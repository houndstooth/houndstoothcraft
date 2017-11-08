import { Canvas, Context, Px } from '../../../src/app/page'
import { getFromBaseOrDefaultPattern } from '../../../src/app/store/getFromBaseOrDefaultPattern'
import { isEmpty } from '../../../src/utilities/codeUtilities'
import { NullarySideEffector } from '../../../src/utilities/types'
import { buildMockCanvas } from '../../unit/helpers/buildMockCanvas'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'

const testMarkersClear: NullarySideEffector =
	(): void => {
		// tslint:disable-next-line:max-line-length
		let testMarkersCanvas: Canvas = document.querySelector('.test-markers-canvas') as HTMLCanvasElement || buildMockCanvas()
		if (isEmpty(testMarkersCanvas)) {
			testMarkersCanvas = createTestMarkersCanvas()
		}
		// tslint:disable-next-line:no-unsafe-any
		const testMarkersContext: Context = testMarkersCanvas.getContext('2d')

		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')

		// tslint:disable-next-line:no-unsafe-any
		testMarkersContext.clearRect(0, 0, canvasSize, canvasSize)
	}

export { testMarkersClear }
