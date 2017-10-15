import state from '../../../../src/state'
import getCurrentContext from '../../../../src/canvas/getCurrentContext'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext = {}
		state.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		state.currentLayer = 3

		expect(getCurrentContext()).toBe(expectedContext)
	})
})
