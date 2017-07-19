/* eslint-disable no-global-assign */

import 'jasmine'
import '../globalCurrent'
import clear from '../src/render/clear'
import testMarkersClear from './helpers/testMarkersClear'
import codeUtilities from '../src/utilities/codeUtilities'
import initialState from '../src/settings/initialSettings'

beforeEach(() => {
	current = codeUtilities.deepClone(initialState)
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

/* eslint-disable no-global-assign */
