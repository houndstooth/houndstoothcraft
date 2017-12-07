import { appState, Context, getCurrentContext, to } from '../../../../../src'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext: Context = {}
		appState.canvas.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		appState.execute.currentLayer = to.Layer(3)

		expect(getCurrentContext.default()).toBe(expectedContext)
	})
})
