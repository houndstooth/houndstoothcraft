import getColor from '../../../src/render/getColor'
import store from '../../../store'

describe('get Color', () => {
	it('gets the color object from the store, using the passed index', () => {
		const expectedColor = {}
		store.mainHoundstooth.basePattern.colorSettings = { set: [ {}, expectedColor, {} ] }

		expect(getColor({ index: 7 })).toBe(expectedColor)
	})
})
