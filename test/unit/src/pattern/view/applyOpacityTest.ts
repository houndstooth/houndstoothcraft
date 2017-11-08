import { setSetting } from '../../../../../src/app/store/setSetting'
import { applyOpacity } from '../../../../../src/pattern/view/applyOpacity'
import { state } from '../../../../../src/state'

describe('apply opacity', () => {
	beforeEach(() => {
		state.contexts = [ { globalAlpha: 1 } ]
	})

	it('has no effect if no opacity level is specified', () => {
		expect(state.contexts[ 0 ].globalAlpha).toBe(1)

		applyOpacity()

		expect(state.contexts[ 0 ].globalAlpha).toBe(1)
	})

	it('has no effect if no opacity level is 1', () => {
		setSetting('colorSettings', { opacity: 1 })

		applyOpacity()

		expect(state.contexts[ 0 ].globalAlpha).toBe(1)
	})

	it('sets the global alpha of the context with the opacity', () => {
		setSetting('colorSettings', { opacity: 0.4 })
		applyOpacity()

		expect(state.contexts[ 0 ].globalAlpha).toBe(0.4)
	})
})
