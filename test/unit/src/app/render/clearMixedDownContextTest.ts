import { appState, clearContext, clearMixedDownContext } from '../../../../../src/indexForTest'
import { buildMockContext } from '../../../helpers'

describe('clear mixed down context', () => {
	it('gets the canvas size and the mixed down canvas, and clears', () => {
		const subject: () => void = clearMixedDownContext.default
		const mixedDownContext: CanvasRenderingContext2D = buildMockContext() as CanvasRenderingContext2D
		appState.render.mixedDownContext = mixedDownContext
		spyOn(clearContext, 'default')

		subject()

		expect(clearContext.default).toHaveBeenCalledWith(mixedDownContext)
	})
})
