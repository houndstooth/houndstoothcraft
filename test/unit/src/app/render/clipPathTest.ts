import { clipPath } from '../../../../../src/app/render/clipPath'
import { state } from '../../../../../src/state'
import { buildMockContext } from '../../../../helpers/buildMockContext'
import { MockContextCall } from '../../../../helpers/types'

describe('clip path', () => {
	it('saves the context to restore the clip later, then clips the context (w/ the current path)', () => {
		const contextCallsOrder: MockContextCall[] = []
		state.contexts = [ buildMockContext({ contextCallsOrder }) ]

		clipPath()

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'save' },
			{ method: 'clip' },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
