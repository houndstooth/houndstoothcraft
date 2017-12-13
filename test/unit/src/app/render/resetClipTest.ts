import { appState, resetClip } from '../../../../../src/indexForTest'
import { buildMockContext, MockContextCall } from '../../../helpers'

describe('reset clip', () => {
	it('restores the context (with the saved state)', () => {
		const subject: () => void = resetClip.default
		const contextCallsOrder: MockContextCall[] = []
		appState.render.contexts = [ buildMockContext({ contextCallsOrder }) ] as CanvasRenderingContext2D[]

		subject()

		const expectedContextCallsOrder: MockContextCall[] = [ { method: 'restore' } ]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
