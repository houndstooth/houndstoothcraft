import { CANVAS_SIZE } from '../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../helpers/getFromBasePatternOrDefault'
import createTestMarkersCanvas from './createTestMarkersCanvas'
import { NullarySideEffector } from '../../../src/utilities/types'

const testMarkersClear: NullarySideEffector = () => {
	let testMarkersCanvas = document.querySelector('.test-markers-canvas') as HTMLCanvasElement
	if (!testMarkersCanvas) {
		testMarkersCanvas = createTestMarkersCanvas()
	}
	const testMarkersContext = testMarkersCanvas.getContext('2d')

	const canvasSize = getFromBasePatternOrDefault(CANVAS_SIZE) as number

	testMarkersContext.clearRect(0, 0, canvasSize, canvasSize)
}

export default testMarkersClear
