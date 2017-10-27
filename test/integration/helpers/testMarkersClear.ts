import { Canvas } from '../../../src/page/types/Canvas'
import { Context } from '../../../src/page/types/Context'
import { Px } from '../../../src/page/types/Px'
import { getFromBaseOrDefaultPattern } from '../../../src/store/getFromBaseOrDefaultPattern'
import { isEmpty } from '../../../src/utilities/codeUtilities'
import { NullarySideEffector } from '../../../src/utilities/types/NullarySideEffector'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'

const testMarkersClear: NullarySideEffector =
	(): void => {
		let testMarkersCanvas: Canvas = document.querySelector('.test-markers-canvas') || {}
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
