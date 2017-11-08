import { Context } from '../../../../../src/app/page'
import { getCurrentContext } from '../../../../../src/app/render/getCurrentContext'
import { state } from '../../../../../src/state'
import * as to from '../../../../../src/to'

describe('get current context', () => {
	it('gets the current context', () => {
		const expectedContext: Context = {}
		state.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
		state.currentLayer = to.Layer(3)

		expect(getCurrentContext()).toBe(expectedContext)
	})
})
