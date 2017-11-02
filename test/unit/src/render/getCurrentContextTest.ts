import { Context } from '../../../../src/page'
import { getCurrentContext } from '../../../../src/render/getCurrentContext'
import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext: Context = {}
		state.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		state.currentLayer = to.Layer(3)

		expect(getCurrentContext()).toBe(expectedContext)
	})
})
