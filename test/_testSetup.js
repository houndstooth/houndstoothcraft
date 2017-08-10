import 'jasmine'
import clear from '../src/render/clear'
import testMarkersClear from './integration/helpers/testMarkersClear'
import setupCanvas from '../src/application/setupCanvas'

beforeEach(() => {
	setupCanvas()
	clear()
	testMarkersClear()
})

describe('when you run the entire test suite', () => {
	it('hides canvases', () => {
		const testCanvasDisplayArea = document.querySelector('.testCanvasDisplayArea')
		if (testCanvasDisplayArea) testCanvasDisplayArea.style.display = 'none'
		const realCanvas = document.querySelector('.realCanvas')
		if (realCanvas) realCanvas.style.display = 'none'
	})
})
