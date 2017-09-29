import { CANVAS_SIZE } from '../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../helpers/getFromBasePatternOrDefault'
import createTestMarkersCanvas from './createTestMarkersCanvas'

export default () => {
	const testMarkersCanvas = document.querySelector('.test-markers-canvas') || createTestMarkersCanvas()
	const testMarkersContext = testMarkersCanvas.getContext('2d')

	const canvasSize = getFromBasePatternOrDefault(CANVAS_SIZE)

	testMarkersContext.clearRect(0, 0, canvasSize, canvasSize)
}
