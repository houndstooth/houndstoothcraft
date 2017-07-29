import clear from '../../../src/render/clear'
import context from '../../../src/render/context'
import houndstoothDefaults from '../../../src/store/houndstoothDefaults'
import store from '../../../store'
import resetStore from '../../helpers/resetStore'

describe('clearrrr', () => {
	beforeEach(() => {
		resetStore(store)
		spyOn(context, 'clearRect')
	})

	describe('when the canvas size is specified', () => {
		it('wipes that amount of canvas', () => {
			store.mainHoundstooth.basePattern.viewSettings = { canvasSize: 500 }

			clear()

			expect(context.clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
		})
	})

	describe('when the canvas size is not specified', () => {
		it('wipes the default amount of canvas', () => {
			clear()

			const defaultCanvasSize = houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern.viewSettings.canvasSize
			expect(context.clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
		})
	})
})
