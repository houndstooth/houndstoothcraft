import getCurrentContext from '../../../src/render/getCurrentContext'
import store from '../../../store'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext = {}
		store.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		store.currentLayer = 3

		expect(getCurrentContext()).toBe(expectedContext)
	})
})
