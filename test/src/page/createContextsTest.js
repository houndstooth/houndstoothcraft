import state from '../../../src/state'
import createContexts from '../../../src/page/createContexts'
import * as createContext from '../../../src/page/createContext'
import createCanvasContainer from '../../../src/page/createCanvasContainer'
import resetState from '../../../src/store/resetState'

describe('create contexts', () => {
	beforeEach(() => {
		resetState(state)
		spyOn(createContext, 'default')
	})

	it('clears the canvas container contents', () => {
		const canvasContainer = document.querySelector('.canvas-container') || createCanvasContainer()
		canvasContainer.innerHTML = 'some old canvases'

		createContexts()

		expect(canvasContainer.innerHTML).toBe('')
	})

	it('adds contexts to the state for each layer', () => {
		state.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		expect(state.contexts.length).toBe(0)

		createContexts()

		expect(state.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts in the state, and canvases on the page', () => {
		state.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		createContexts()

		expect(createContext.default.calls.count()).toBe(6)
		expect(state.contexts.length).toBe(6)

		state.mainHoundstooth.basePattern.layerSettings = { endLayer: 3 }
		createContext.default.calls.reset()

		createContexts()

		expect(createContext.default.calls.count()).toBe(4)
		expect(state.contexts.length).toBe(4)
	})
})
