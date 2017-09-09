import state from '../../../state'
import getCurrentContext from '../../../src/display/getCurrentContext'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext = {}
		state.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		state.currentLayer = 3

		expect(getCurrentContext()).toBe(expectedContext)
	})
})
