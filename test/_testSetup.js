import 'jasmine'
import clear from '../src/render/clear'
import testMarkersClear from './integration/helpers/testMarkersClear'
import setupCanvases from '../src/application/setupCanvases'
import setupContexts from '../src/application/setupContexts'
import setupMixedDownCanvas from '../src/render/setupMixedDownCanvas'
import store from '../store'

beforeEach(() => {
	setupCanvases()
	setupMixedDownCanvas()
	setupContexts()
	clear()
	testMarkersClear()
})

describe('when you run the entire test suite', () => {
	it('hides canvases', () => {
		const testCanvasDisplayArea = document.querySelector('.testCanvasDisplayArea')
		if (testCanvasDisplayArea) testCanvasDisplayArea.style.display = 'none'

		const realCanvas = document.querySelector('.realCanvas')
		if (realCanvas) realCanvas.style.display = 'none'

		store.canvases.forEach(canvas => canvas.style.display = 'none')
		store.mixedDownCanvas.style.display = 'none'
	})
})
