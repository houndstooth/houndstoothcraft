import clear from '../../../src/render/clear'
import ctx from '../../../src/render/ctx'
import { CANVAS_SIZE } from '../../../src/defaults'

describe('clear', () => {
	beforeEach(() => spyOn(ctx, 'clearRect'))

	describe('when the canvas size is specified', () => {
		it('wipes that amount of canvas', () => {
			settings.initial.viewSettings = { canvasSize: 500 }

			clear()

			expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
		})
	})

	describe('when the canvas size is not specified', () => {
		it('wipes the default amount of canvas', () => {
			clear()

			expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, CANVAS_SIZE, CANVAS_SIZE)
		})
	})
})
