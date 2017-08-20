import 'jasmine'
import clear from '../src/render/clear'
import testMarkersClear from './integration/helpers/testMarkersClear'
import setupCanvases from '../src/application/setupCanvases'
import setupContexts from '../src/application/setupContexts'
import setupMixedDownCanvas from '../src/render/setupMixedDownCanvas'

beforeEach(() => {
	setupCanvases()
	setupMixedDownCanvas()
	setupContexts()
	clear()
	testMarkersClear()
})

describe('when you run the entire test suite', () => {
	it('hides all the canvases', () => {
		const testCanvasDisplayArea = document.querySelector('.test-canvas-display-area')
		if (testCanvasDisplayArea) testCanvasDisplayArea.style.display = 'none'

		const mixedDownCanvas = document.querySelector('.mixed-down-canvas')
		if (mixedDownCanvas) mixedDownCanvas.style.display = 'none'

		const canvasContainer = document.querySelector('.canvas-container')
		if (canvasContainer) canvasContainer.style.display = 'none'
	})
})
