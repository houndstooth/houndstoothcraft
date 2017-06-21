import 'jasmine'

import setupCanvas from '../../render/setupCanvas'
import state from '../../state/state'
import canvas from '../../render/canvas'

describe('setupCanvas', () => {
	it('sets the canvas\'s width and height with config', () => {
		state.viewConfig.canvasSize = 400

		setupCanvas()

		expect(canvas.width).toEqual(400)
		expect(canvas.height).toEqual(400)
	})
})
