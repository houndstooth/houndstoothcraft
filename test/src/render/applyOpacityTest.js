import applyOpacity from '../../../src/render/applyOpacity'
import state from '../../../state'

describe('apply opacity', () => {
	beforeEach(() => {
		state.contexts = [ { globalAlpha: 1 } ]
	})

	it('has no effect if no opacity level is specified', () => {
		expect(state.contexts[0].globalAlpha).toBe(1)

		applyOpacity()

		expect(state.contexts[0].globalAlpha).toBe(1)
	})

	it('has no effect if no opacity level is 1', () => {
		state.mainHoundstooth.basePattern.colorSettings = { opacity: 1 }

		applyOpacity()

		expect(state.contexts[0].globalAlpha).toBe(1)
	})

	it('sets the global alpha of the context with the opacity', () => {
		state.mainHoundstooth.basePattern.colorSettings = { opacity: 0.4 }
		applyOpacity()

		expect(state.contexts[0].globalAlpha).toBe(0.4)
	})
})
