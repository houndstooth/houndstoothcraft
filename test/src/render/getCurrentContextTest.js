import getCurrentContext from '../../../src/render/getCurrentContext'
import store from '../../../store'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext = {}
		store.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		store.iterationFrame = 3

		expect(getCurrentContext()).toBe(expectedContext)
	})
})
