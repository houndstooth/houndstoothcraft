import { appState, clipPath } from '../../../../../src/indexForTest'
import { buildMockContext, MockContextCall } from '../../../helpers'

describe('clip path', () => {
	it('saves the context to restore the clip later, then clips the context (w/ the current path)', () => {
		const subject: () => void = clipPath.default
		const contextCallsOrder: MockContextCall[] = []
		appState.render.contexts = [ buildMockContext({ contextCallsOrder }) ] as CanvasRenderingContext2D[]

		subject()

		const expectedContextCallsOrder: MockContextCall[] = [
			{ method: 'save' },
			{ method: 'clip' },
		]
		expect(contextCallsOrder).toEqual(expectedContextCallsOrder)
	})
})
