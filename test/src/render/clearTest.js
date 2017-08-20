import clear from '../../../src/render/clear'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import setupContexts from '../../../src/application/setupContexts'
import setupCanvases from '../../../src/application/setupCanvases'
import setupMixedDownCanvas from '../../../src/render/setupMixedDownCanvas'

describe('clear', () => {

	beforeEach(() => clear.__Rewire__('getCanvasSize', () => [ 400, 500 ]))

	describe('when there is a single context', () => {
		beforeEach(() => {
			resetStore(store)
			setupCanvases()
			setupMixedDownCanvas()
			setupContexts()

			spyOn(store.contexts[0], 'clearRect')
			spyOn(store.mixedDownCanvas.getContext('2d'), 'clearRect')

			clear()
		})


		it('wipes the default amount of canvas', () => {
			expect(store.contexts[0].clearRect).toHaveBeenCalledWith(0, 0, 400, 500)
		})

		it('also wipes the mixed down canvas', () => {
			expect(store.mixedDownCanvas.getContext('2d').clearRect).toHaveBeenCalledWith(0, 0, 400, 500)
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

			expect(store.contexts[0].clearRect).toHaveBeenCalledWith(0, 0, 400, 500)
			expect(store.contexts[1].clearRect).toHaveBeenCalledWith(0, 0, 400, 500)
			expect(store.contexts[2].clearRect).toHaveBeenCalledWith(0, 0, 400, 500)
			expect(store.contexts[3].clearRect).toHaveBeenCalledWith(0, 0, 400, 500)
			expect(store.mixedDownCanvas.getContext('2d').clearRect).toHaveBeenCalledWith(0, 0, 400, 500)
		})
	})
})
