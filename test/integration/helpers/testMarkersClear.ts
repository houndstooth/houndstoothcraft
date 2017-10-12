import { CANVAS_SIZE } from '../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../helpers/getFromBasePatternOrDefault'
import createTestMarkersCanvas from './createTestMarkersCanvas'

const testMarkersClear = () => {
	let testMarkersCanvas = document.querySelector('.test-markers-canvas') as HTMLCanvasElement
	if (!testMarkersCanvas) {
		testMarkersCanvas = createTestMarkersCanvas()
	}
	const testMarkersContext = testMarkersCanvas.getContext('2d')

	const canvasSize = getFromBasePatternOrDefault(CANVAS_SIZE)

	testMarkersContext.clearRect(0, 0, canvasSize, canvasSize)
}

export default testMarkersClear
