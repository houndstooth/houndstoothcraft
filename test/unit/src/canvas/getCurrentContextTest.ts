import { getCurrentContext } from '../../../../src/canvas/getCurrentContext'
import { state } from '../../../../src/state'
import * as to from '../../../../src/to'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext = {}
		state.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		state.currentLayer = to.Layer(3)

		expect(getCurrentContext()).toBe(expectedContext)
	})
})
