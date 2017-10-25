import { clipPath } from '../../../../src/render/clipPath'
import { state } from '../../../../src/state'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { MockContextCall } from '../../../types/MockContextCall'

describe('clip path', () => {
	it('saves the context to restore the clip later, then clips the context (w/ the current path)', () => {
		const contextCallsOrder: MockContextCall[] = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		clipPath()

		// tslint:disable:no-any
		const expectedContextCallsOrder = [
			{ method: 'save' },
			{ method: 'clip' },
		] as any
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
