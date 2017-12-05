import { completeLayers, NullarySideEffector, state, to } from '../../../../../src'

const subject: NullarySideEffector = completeLayers.default

describe('complete layers', () => {
	beforeEach(() => {
		state.execute.currentLayer = to.Layer(497)

		subject()
	})

	it('resets the current layer to zero', () => {
		expect(state.execute.currentLayer).toBe(to.Layer(0))
	})

	it('resets the layer progress bar', () => {
		expect(state.dom.layersProgressBar.style.width).toBe('0%')
	})
})
