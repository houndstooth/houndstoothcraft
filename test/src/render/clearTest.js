import clear from '../../../src/render/clear'
import context from '../../../src/render/context'
import houndstoothDefaults from '../../../src/state/houndstoothDefaults'
import store from '../../../store'
import codeUtilities from '../../../src/utilities/codeUtilities'
import initialState from '../../../src/state/initialState'

describe('clear', () => {
	beforeEach(() => {
		store.currentState = codeUtilities.deepClone(initialState.INITIAL_STATE)
		spyOn(context, 'clearRect')
	})

	describe('when the canvas size is specified', () => {
		it('wipes that amount of canvas', () => {
			store.currentState.mainHoundstooth.basePattern.viewSettings = { canvasSize: 500 }

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
