import store from '../../../store'
import layerIterator from '../../../src/display/layerIterator'

describe('layer iterator', () => {
	it('returns an array of numbers of each layer', () => {
		store.mainHoundstooth.basePattern.layerSettings = { endLayer: 5 }

		expect(layerIterator()).toEqual([ 0,1,2,3,4,5 ])
	})
})
