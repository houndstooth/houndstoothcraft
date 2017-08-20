import clear from '../../../src/render/clear'
import houndstoothDefaults from '../../../src/store/houndstoothDefaults'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import setupContexts from '../../../src/application/setupContexts'
import setupCanvases from '../../../src/application/setupCanvases'
import setupMixedDownCanvas from '../../../src/render/setupMixedDownCanvas'

describe('clear', () => {
	const defaultCanvasSize = houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern.viewSettings.canvasSize

	describe('when there is a single context', () => {
		beforeEach(() => {
			resetStore(store)
			setupCanvases()
			setupMixedDownCanvas()
			setupContexts()

			spyOn(store.contexts[0], 'clearRect')
			spyOn(store.mixedDownCanvas.getContext('2d'), 'clearRect')
		})

		describe('when the canvas size is specified', () => {
			beforeEach(() => {
				store.mainHoundstooth.basePattern.viewSettings = { canvasSize: 500 }

				clear()
			})

			it('wipes that amount of canvas', () => {
				expect(store.contexts[0].clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
			})

			it('also wipes the mixed down canvas', () => {
				expect(store.mixedDownCanvas.getContext('2d').clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
			})
		})

		describe('when the canvas size is not specified', () => {
			beforeEach(clear)

			it('wipes the default amount of canvas', () => {
				expect(store.contexts[0].clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
			})

			it('also wipes the mixed down canvas', () => {
				expect(store.mixedDownCanvas.getContext('2d').clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
			})
		})
	})

	describe('when there are multiple contexts', () => {
		beforeEach(() => {
			resetStore(store)
			store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 3 }
			setupCanvases()
			setupMixedDownCanvas()
			setupContexts()

			spyOn(store.contexts[0], 'clearRect')
			spyOn(store.contexts[1], 'clearRect')
			spyOn(store.contexts[2], 'clearRect')
			spyOn(store.contexts[3], 'clearRect')
			spyOn(store.mixedDownCanvas.getContext('2d'), 'clearRect')
		})

		it('wipes every canvas', () => {
			clear()

			expect(store.contexts[0].clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
			expect(store.contexts[1].clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
			expect(store.contexts[2].clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
			expect(store.contexts[3].clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
			expect(store.mixedDownCanvas.getContext('2d').clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
		})
	})
})
