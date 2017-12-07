import { applyOpacity, appState, NullarySideEffector } from '../../../../../src'
import { setPatternStateForTest } from '../../../helpers'

const subject: NullarySideEffector = applyOpacity.default

describe('apply opacity', () => {
	beforeEach(() => {
		appState.canvas.contexts = [ { globalAlpha: 1 } ]
	})

	it('has no effect if no opacity level is specified', () => {
		expect(appState.canvas.contexts[ 0 ].globalAlpha).toBe(1)

		subject()

		expect(appState.canvas.contexts[ 0 ].globalAlpha).toBe(1)
	})

	it('has no effect if no opacity level is 1', () => {
		setPatternStateForTest('colorSettings', { opacity: 1 })

		subject()

		expect(appState.canvas.contexts[ 0 ].globalAlpha).toBe(1)
	})

	it('sets the global alpha of the context with the opacity', () => {
		setPatternStateForTest('colorSettings', { opacity: 0.4 })
		subject()

		expect(appState.canvas.contexts[ 0 ].globalAlpha).toBe(0.4)
	})
})
