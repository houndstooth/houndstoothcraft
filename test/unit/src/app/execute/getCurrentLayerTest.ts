import { appState, getCurrentLayer, Layer, to } from '../../../../../src/indexForTest'

describe('get current layer', () => {
	it('returns the current layer', () => {
		const subject: () => Layer = getCurrentLayer.default
		appState.execute.currentLayer = to.Layer(57)

		expect(subject()).toBe(to.Layer(57))
	})
})
