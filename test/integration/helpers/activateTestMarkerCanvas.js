import settingsPaths from '../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../helpers/getFromBasePatternOrDefault'
import interfaceUtilities from '../../../src/utilities/interfaceUtilities'

const prepareCanvasForDisplayInTest = canvas => {
	canvas.style.position = 'absolute'
	canvas.style.top = 0
	canvas.style.left = 0
}

export default () => {
	let testMarkersCanvas = document.querySelector('.testMarkersCanvas')

	prepareCanvasForDisplayInTest(testMarkersCanvas)
	testMarkersCanvas.style.zIndex = 9001

	const canvasSize = getFromBasePatternOrDefault(settingsPaths.CANVAS_SIZE)
	testMarkersCanvas.width = canvasSize
	testMarkersCanvas.height = canvasSize

	const testCanvasDisplayArea = document.querySelector('.testCanvasDisplayArea')
	testCanvasDisplayArea.style.width = `${canvasSize}px`
	testCanvasDisplayArea.style.height = `${canvasSize}px`

	interfaceUtilities.iterationFrameIterator().forEach(iterationFrame => {
		let canvas = document.querySelector(`.realCanvas-${iterationFrame}`)
		prepareCanvasForDisplayInTest(canvas)
	})
}
