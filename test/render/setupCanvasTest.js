import 'jasmine'
import setupCanvas from '../../src/render/setupCanvas'
import canvas from '../../src/render/canvas'
import { CANVAS_SIZE } from '../../src/defaults'

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

    it('defaults the canvas width and height, if not provided', () => {
        console.log('NOT setting the canvas size for this test', Object.keys(state).length)

        setupCanvas()

        expect(canvas.width).toEqual(CANVAS_SIZE)
        expect(canvas.height).toEqual(CANVAS_SIZE)
    })
})
