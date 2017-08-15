import clear from '../../../src/render/clear'
import houndstoothDefaults from '../../../src/store/houndstoothDefaults'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import setupContexts from '../../../src/application/setupContexts'
import setupCanvases from '../../../src/application/setupCanvases'
import setupMixedDownCanvas from '../../../src/render/setupMixedDownCanvas'

describe('clear', () => {
	beforeEach(() => {
		resetStore(store)
		setupCanvases()
		setupMixedDownCanvas()
		setupContexts()
		spyOn(store.contexts[0], 'clearRect')
	})

	describe('when the canvas size is specified', () => {
		it('wipes that amount of canvas', () => {
			store.mainHoundstooth.basePattern.viewSettings = { canvasSize: 500 }

			clear()

			expect(store.contexts[0].clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
		})
	})

	describe('when the canvas size is not specified', () => {
		it('wipes the default amount of canvas', () => {
			clear()

			const defaultCanvasSize = houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern.viewSettings.canvasSize
			expect(store.contexts[0].clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
		})
	})
})
