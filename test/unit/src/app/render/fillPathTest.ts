import { appState, fillPath, NullarySideEffector } from '../../../../../src'
import { buildMockContext, MockContextCall } from '../../../../helpers'

const subject: NullarySideEffector = fillPath.default

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const contextCallsOrder: MockContextCall[] = []
		appState.canvas.contexts = [ buildMockContext({ contextCallsOrder }) ]

		subject()

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'closePath' },
			{ method: 'fill' },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
