import clear from '../../../src/render/clear'
import context from '../../../src/render/context'
import defaultSettings from '../../../src/settings/defaultSettings'

describe('clear', () => {
	beforeEach(() => spyOn(context, 'clearRect'))

	describe('when the canvas size is specified', () => {
		it('wipes that amount of canvas', () => {
			currentState.settings.base.viewSettings = { canvasSize: 500 }

			clear()

			expect(context.clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
		})
	})

	describe('when the canvas size is not specified', () => {
		it('wipes the default amount of canvas', () => {
			clear()

			const defaultCanvasSize = defaultSettings.base.viewSettings.canvasSize
			expect(context.clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
		})
	})
})
