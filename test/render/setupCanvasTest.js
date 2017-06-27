import 'jasmine'
import setupCanvas from '../../src/render/setupCanvas'
import canvas from '../../src/render/canvas'
import { CANVAS_SIZE } from '../../src/defaults'

describe('setupCanvas', () => {
	it('sets the canvas width and height with config, if provided', () => {
		settings.initial.viewConfig = { canvasSize: 400 }

		setupCanvas()

		expect(canvas.width).toEqual(400)
		expect(canvas.height).toEqual(400)
	})

    it('defaults the canvas width and height, if not provided', () => {
        setupCanvas()

        expect(canvas.width).toEqual(CANVAS_SIZE)
        expect(canvas.height).toEqual(CANVAS_SIZE)
    })
})
