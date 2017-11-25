import { applyOpacity, setSetting, state } from '../../../../../src'

describe('apply opacity', () => {
	beforeEach(() => {
		state.contexts = [ { globalAlpha: 1 } ]
	})

	it('has no effect if no opacity level is specified', () => {
		expect(state.contexts[ 0 ].globalAlpha).toBe(1)

		applyOpacity.main()

		expect(state.contexts[ 0 ].globalAlpha).toBe(1)
	})

	it('has no effect if no opacity level is 1', () => {
		setSetting.main('colorSettings', { opacity: 1 })

		applyOpacity.main()

		expect(state.contexts[ 0 ].globalAlpha).toBe(1)
	})

	it('sets the global alpha of the context with the opacity', () => {
		setSetting.main('colorSettings', { opacity: 0.4 })
		applyOpacity.main()

		expect(state.contexts[ 0 ].globalAlpha).toBe(0.4)
	})
})
