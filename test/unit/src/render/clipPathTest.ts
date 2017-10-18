import { clipPath } from '../../../../src/render/clipPath'
import { buildMockContext } from '../../../helpers/buildMockContext'

describe('clip path', () => {
	it('saves the context to restore the clip later, then clips the context (w/ the current path)', () => {
		const contextCallsOrder = [] as any
		const context = buildMockContext({ contextCallsOrder })

		clipPath({ context })

		const expected = [
			{ method: 'save' },
			{ method: 'clip' },
		]
		expect(contextCallsOrder).toEqual(expected)
	})
})
