import { layerIterator } from '../../../../src/canvas/layerIterator'
import { state } from '../../../../src/state'

describe('layer iterator', () => {
	it('returns an array of incrementing layers', () => {
		if (state.mainHoundstooth.basePattern) {
			state.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }
		}

		expect(layerIterator()).toEqual([ 0 as any, 1 as any, 2 as any, 3 as any, 4 as any, 5 as any ])
	})
})
