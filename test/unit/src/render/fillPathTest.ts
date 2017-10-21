import { fillPath } from '../../../../src/render/fillPath'
import { buildMockContext } from '../../../helpers/buildMockContext'

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const contextCallsOrder = []
		const context = buildMockContext({ contextCallsOrder })

		fillPath({ context })

		const expectedContextCallsOrder = [
			{ method: 'closePath' },
			{ method: 'fill' },
		] as any
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
