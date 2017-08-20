import settingsPaths from '../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../helpers/getFromBasePatternOrDefault'
import setupTestMarkersCanvas from './setupTestMarkersCanvas'

export default () => {
	const testMarkersCanvas = document.querySelector('.test-markers-canvas') || setupTestMarkersCanvas()
	const testMarkersContext = testMarkersCanvas.getContext('2d')

	const canvasSize = getFromBasePatternOrDefault(settingsPaths.CANVAS_SIZE)

	testMarkersContext.clearRect(0, 0, canvasSize, canvasSize)
}
