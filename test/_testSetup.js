import 'jasmine'
import '../globalCurrent'
import clear from '../src/render/clear'
import testMarkersClear from './helpers/testMarkersClear'

beforeEach(() => {
	Object.keys(current.settings.initial).forEach(key => delete current.settings.initial[ key ])
	Object.keys(current.settings.iterations).forEach(key => delete current.settings.iterations[ key ])
	Object.keys(current.settings.animations).forEach(key => delete current.settings.animations[ key ])
	current.iterationFrame = 0
	current.animationFrame = 0
	current.lastSavedAnimationFrame = 0
	current.interval = null
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
