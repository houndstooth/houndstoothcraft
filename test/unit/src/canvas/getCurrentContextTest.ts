import getCurrentContext from '../../../../src/canvas/getCurrentContext'
import state from '../../../../src/state'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext = {}
		state.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		state.currentLayer = 3

		expect(getCurrentContext()).toBe(expectedContext)
	})
})
