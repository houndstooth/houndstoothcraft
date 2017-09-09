import store from '../../../store'
import getCurrentContext from '../../../src/display/getCurrentContext'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext = {}
		store.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		store.currentLayer = 3

		expect(getCurrentContext()).toBe(expectedContext)
	})
})
