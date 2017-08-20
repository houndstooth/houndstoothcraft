import applyOpacity from '../../../src/render/applyOpacity'
import store from '../../../store'

describe('apply opacity', () => {
	beforeEach(() => {
		store.contexts = [ { globalAlpha: 1 } ]
	})

	it('has no effect if no opacity level is specified', () => {
		expect(store.contexts[0].globalAlpha).toBe(1)

		applyOpacity()

		expect(store.contexts[0].globalAlpha).toBe(1)
	})

	it('has no effect if no opacity level is 1', () => {
		store.mainHoundstooth.basePattern.colorSettings = { opacity: 1 }

		applyOpacity()

		expect(store.contexts[0].globalAlpha).toBe(1)
	})

	it('sets the global alpha of the context with the opacity', () => {
		store.mainHoundstooth.basePattern.colorSettings = { opacity: 0.4 }
		applyOpacity()

		expect(store.contexts[0].globalAlpha).toBe(0.4)
	})
})
