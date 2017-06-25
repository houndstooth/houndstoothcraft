import 'jasmine'

import setupCanvas from '../../src/render/setupCanvas'
import state from '../../src/state/state'
import canvas from '../../src/render/canvas'

import _resetStatesForTest from '../_resetStatesForTest'
beforeEach(() => _resetStatesForTest({ 
    state: typeof state === 'undefined' ? {} : state, 
    iterations: typeof iterations === 'undefined' ? {} : iterations, 
    animations: typeof animations === 'undefined' ? {} : animations, 
}))

describe('setupCanvas', () => {
	it('sets the canvas\'s width and height with config', () => {
		state.viewConfig = { canvasSize: 400 }

		setupCanvas()

		expect(canvas.width).toEqual(400)
		expect(canvas.height).toEqual(400)
	})
})
