import { fillPath } from '../../../../src/render/fillPath'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { MockContextMethod } from '../../../types/MockContextMethod'

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const contextCallsOrder = []
		const context = buildMockContext({ contextCallsOrder })

		fillPath({ context })

		const expectedContextCallsOrder = [
			{ method: MockContextMethod.ClosePath },
			{ method: MockContextMethod.Fill },
		] as any
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
