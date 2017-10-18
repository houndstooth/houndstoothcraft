import { layerIterator } from '../../../../src/canvas/layerIterator'
import { state } from '../../../../src/state'

describe('layer iterator', () => {
	it('returns an array of numbers of each layer', () => {
		if (state.mainHoundstooth.basePattern) {
			state.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		}

		expect(layerIterator()).toEqual([ 0, 1, 2, 3, 4, 5 ])
	})
})
