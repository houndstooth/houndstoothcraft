import { Canvas } from '../../../src/page/types/Canvas'
import { isEmpty } from '../../../src/utilities/codeUtilities'
import { NullarySideEffector } from '../../../src/utilities/types'
import { getFromBasePatternOrDefault } from '../../helpers/getFromBasePatternOrDefault'
import { CANVAS_SIZE } from '../../helpers/settingsPaths'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'

const testMarkersClear: NullarySideEffector = () => {
	let testMarkersCanvas: Canvas = document.querySelector('.test-markers-canvas') || {}
	if (isEmpty(testMarkersCanvas)) {
		testMarkersCanvas = createTestMarkersCanvas()
	}
	const testMarkersContext = testMarkersCanvas.getContext('2d')

	const canvasSize = getFromBasePatternOrDefault(CANVAS_SIZE)

	testMarkersContext.clearRect(0, 0, canvasSize, canvasSize)
}

export { testMarkersClear }
