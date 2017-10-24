import { Canvas } from '../../../src/page/types/Canvas'
import { Px } from '../../../src/page/types/Px'
import { getFromBaseOrDefaultPattern } from '../../../src/store/getFromBaseOrDefaultPattern'
import { isEmpty } from '../../../src/utilities/codeUtilities'
import { NullarySideEffector } from '../../../src/utilities/types/NullarySideEffector'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'

const testMarkersClear: NullarySideEffector = () => {
	let testMarkersCanvas: Canvas = document.querySelector('.test-markers-canvas') || {}
	if (isEmpty(testMarkersCanvas)) {
		testMarkersCanvas = createTestMarkersCanvas()
	}
	const testMarkersContext = testMarkersCanvas.getContext('2d')

	const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')

	testMarkersContext.clearRect(0, 0, canvasSize, canvasSize)
}

export { testMarkersClear }
