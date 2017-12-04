import { fillPath, state } from '../../../../../src'
import { buildMockContext, MockContextCall } from '../../../../helpers'

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const contextCallsOrder: MockContextCall[] = []
		state.canvas.contexts = [ buildMockContext({ contextCallsOrder }) ]

		fillPath.default()

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'closePath' },
			{ method: 'fill' },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
