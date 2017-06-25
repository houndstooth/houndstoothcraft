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
	it('sets the canvas width and height with config, if provided', () => {
		state.viewConfig = { canvasSize: 400 }
        console.log('setting canvas size just for this test', Object.keys(state).length)

		setupCanvas()

		expect(canvas.width).toEqual(400)
		expect(canvas.height).toEqual(400)
	})

    it('defaults the canvas width and height to 800, if not provided', () => {
        console.log('NOT setting the canvas size for this test', Object.keys(state).length)

        setupCanvas()

        expect(canvas.width).toEqual(800)
        expect(canvas.height).toEqual(800)
    })
})
