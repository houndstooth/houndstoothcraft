import clear from '../../../src/render/clear'
import context from '../../../src/render/context'
import { CANVAS_SIZE } from '../../../src/defaults'

describe('clear', () => {
	beforeEach(() => spyOn(context, 'clearRect'))

	describe('when the canvas size is specified', () => {
		it('wipes that amount of canvas', () => {
			current.settings.initial.viewSettings = { canvasSize: 500 }

			clear()

			expect(context.clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
		})
	})

	describe('when the canvas size is not specified', () => {
		it('wipes the default amount of canvas', () => {
			clear()

			expect(context.clearRect).toHaveBeenCalledWith(0, 0, CANVAS_SIZE, CANVAS_SIZE)
		})
	})
})
