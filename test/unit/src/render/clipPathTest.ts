import { clipPath } from '../../../../src/render/clipPath'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { MockContextMethod } from '../../../types/MockContextMethod'

describe('clip path', () => {
	it('saves the context to restore the clip later, then clips the context (w/ the current path)', () => {
		const contextCallsOrder = []
		const context = buildMockContext({ contextCallsOrder })

		clipPath({ context })

		const expectedContextCallsOrder = [
			{ method: MockContextMethod.Save },
			{ method: MockContextMethod.Clip },
		] as any
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
