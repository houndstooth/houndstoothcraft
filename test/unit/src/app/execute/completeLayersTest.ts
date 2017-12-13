import { appState, completeLayers, to } from '../../../../../src/indexForTest'

describe('complete layers', () => {
	let subject: () => void
	beforeEach(() => {
		subject = completeLayers.default
		appState.execute.currentLayer = to.Layer(497)

		subject()
	})

	it('resets the current layer to zero', () => {
		expect(appState.execute.currentLayer).toBe(to.Layer(0))
	})

	it('resets the layer progress bar', () => {
		expect(appState.dom.layersProgressBar.style.width).toBe('0%')
	})
})
