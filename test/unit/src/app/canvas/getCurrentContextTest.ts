import { Context, getCurrentContext, state, to } from '../../../../../src'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext: Context = {}
		state.canvas.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		state.currentLayer = to.Layer(3)

		expect(getCurrentContext.default()).toBe(expectedContext)
	})
})
