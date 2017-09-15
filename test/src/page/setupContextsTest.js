import state from '../../../state'
import setupContexts from '../../../src/page/setupContexts'
import * as setupContext from '../../../src/page/setupContext'
import setupCanvasContainer from '../../../src/page/setupCanvasContainer'
import resetState from '../../../src/store/resetState'

describe('setup contexts', () => {
	beforeEach(() => {
		resetState(state)
		spyOn(setupContext, 'default')
	})

	it('clears the canvas container contents', () => {
		const canvasContainer = document.querySelector('.canvas-container') || setupCanvasContainer()
		canvasContainer.innerHTML = 'some old canvases'

		setupContexts()

		expect(canvasContainer.innerHTML).toBe('')
	})

	it('adds contexts to the state for each layer', () => {
		state.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		expect(state.contexts.length).toBe(0)

		setupContexts()

		expect(state.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts in the state, and canvases on the page', () => {
		state.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		setupContexts()

		expect(setupContext.default.calls.count()).toBe(6)
		expect(state.contexts.length).toBe(6)

		state.mainHoundstooth.basePattern.layerSettings = { endLayer: 3 }
		setupContext.default.calls.reset()

		setupContexts()

		expect(setupContext.default.calls.count()).toBe(4)
		expect(state.contexts.length).toBe(4)
	})
})
