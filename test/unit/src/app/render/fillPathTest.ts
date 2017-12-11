import { appState, fillPath, NullarySideEffector } from '../../../../../src/indexForTest'
import { buildMockContext, MockContextCall } from '../../../helpers'

const subject: NullarySideEffector = fillPath.default

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const contextCallsOrder: MockContextCall[] = []
		appState.render.contexts = [ buildMockContext({ contextCallsOrder }) ] as CanvasRenderingContext2D[]

		subject()

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'closePath' },
			{ method: 'fill' },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
