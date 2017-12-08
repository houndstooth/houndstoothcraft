import { appState, NullarySideEffector, resetClip } from '../../../../../src'
import { buildMockContext, MockContextCall } from '../../../../helpers'

const subject: NullarySideEffector = resetClip.default

describe('reset clip', () => {
	it('restores the context (with the saved state)', () => {
		const contextCallsOrder: MockContextCall[] = []
		appState.canvas.contexts = [ buildMockContext({ contextCallsOrder }) ] as CanvasRenderingContext2D[]

		subject()

		const expectedContextCallsOrder: MockContextCall[] = [ { method: 'restore' } ]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
