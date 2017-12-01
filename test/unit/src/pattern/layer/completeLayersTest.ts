import { completeLayers, NullarySideEffector, PageElement, state, to } from '../../../../../src'
import { mockQuerySelector } from '../../../helpers'

const subject: NullarySideEffector = completeLayers.default

describe('complete layers', () => {
	let layersProgressBar: PageElement
	beforeEach(() => {
		state.currentLayer = to.Layer(497)
		const { layersProgressBar: tmpLayersProgressBar } = mockQuerySelector()
		layersProgressBar = tmpLayersProgressBar

		subject()
	})

	it('resets the current layer to zero', () => {
		expect(state.currentLayer).toBe(to.Layer(0))
	})

	it('resets the layer progress bar', () => {
		expect(layersProgressBar.style.width).toBe('0%')
	})
})
