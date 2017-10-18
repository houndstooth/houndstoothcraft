import { Canvas } from '../../../src/page/types/Canvas'
import { NullarySideEffector } from '../../../src/utilities/types'
import { getFromBasePatternOrDefault } from '../../helpers/getFromBasePatternOrDefault'
import { CANVAS_SIZE } from '../../helpers/settingsPaths'
import { createTestMarkersCanvas } from './createTestMarkersCanvas'

const testMarkersClear: NullarySideEffector = (() => {
	let testMarkersCanvas = document.querySelector('.test-markers-canvas') as Canvas
	if (!testMarkersCanvas) {
		testMarkersCanvas = createTestMarkersCanvas()
	}
	const testMarkersContext = testMarkersCanvas.getContext('2d')

	const canvasSize = getFromBasePatternOrDefault(CANVAS_SIZE) as number

	testMarkersContext.clearRect(0, 0, canvasSize, canvasSize)
}) as NullarySideEffector

export { testMarkersClear }
