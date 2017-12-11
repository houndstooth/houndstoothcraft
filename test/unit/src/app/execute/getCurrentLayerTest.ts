import { appState, getCurrentLayer, Layer, to } from '../../../../../src/indexForTest'

const subject: () => Layer = getCurrentLayer.default

describe('get current layer', () => {
	it('returns the current layer', () => {
		appState.execute.currentLayer = to.Layer(57)

		expect(subject()).toBe(to.Layer(57))
	})
})
