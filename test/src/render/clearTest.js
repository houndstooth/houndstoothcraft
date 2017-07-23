import clear from '../../../src/render/clear'
import context from '../../../src/render/context'
import patternDefaults from '../../../src/state/patternDefaults'
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
			store.currentState.builtPattern.base.viewSettings = { canvasSize: 500 }

			clear()

			expect(context.clearRect).toHaveBeenCalledWith(0, 0, 500, 500)
		})
	})

	describe('when the canvas size is not specified', () => {
		it('wipes the default amount of canvas', () => {
			clear()

			const defaultCanvasSize = patternDefaults.base.viewSettings.canvasSize
			expect(context.clearRect).toHaveBeenCalledWith(0, 0, defaultCanvasSize, defaultCanvasSize)
		})
	})
})
