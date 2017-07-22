import 'jasmine'
import clear from '../src/render/clear'
import testMarkersClear from './integration/helpers/testMarkersClear'
import codeUtilities from '../src/utilities/codeUtilities'
import initialState from '../src/state/initialState'
import setupCanvas from '../src/render/setupCanvas'

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
