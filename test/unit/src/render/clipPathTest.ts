import { clipPath } from '../../../../src/render/clipPath'
import { state } from '../../../../src/state'
import { buildMockContext } from '../../../helpers/buildMockContext'

describe('clip path', () => {
	it('saves the context to restore the clip later, then clips the context (w/ the current path)', () => {
		const contextCallsOrder = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		clipPath()

		const expectedContextCallsOrder = [
			{ method: 'save' },
			{ method: 'clip' },
		] as any
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
