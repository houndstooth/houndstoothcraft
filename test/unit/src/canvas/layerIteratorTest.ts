import { state, to } from '../../../../src'
import { layerIterator } from '../../../../src/canvas/layerIterator'

describe('layer iterator', () => {
	it('returns an array of incrementing layers', () => {
		if (state.mainHoundstooth.basePattern) {
			state.mainHoundstooth.basePattern.layerSettings = { endLayer: to.Layer(5) }
		}

		expect(layerIterator()).toEqual(to.Layers([ 0, 1, 2, 3, 4, 5 ]))
	})
})
