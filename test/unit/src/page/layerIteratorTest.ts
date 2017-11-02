import { to } from '../../../../src'
import { layerIterator } from '../../../../src/page/layerIterator'
import { setSetting } from '../../../../src/store/setSetting'

describe('layer iterator', () => {
	it('returns an array of incrementing layers', () => {
		setSetting('endLayer', to.Layer(5))

		expect(layerIterator()).toEqual(to.Layers([ 0, 1, 2, 3, 4, 5 ]))
	})
})
