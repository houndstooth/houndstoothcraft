import {
	appState,
	clearContext,
	clearMixedDownContext,
	CanvasRenderingContext2D,
	NullarySideEffector,
} from '../../../../../src'
import { buildMockContext } from '../../../../helpers'

const subject: NullarySideEffector = clearMixedDownContext.default

describe('clear mixed down context', () => {
	it('gets the canvas size and the mixed down canvas, and clears', () => {
		const mixedDownContext: CanvasRenderingContext2D = buildMockContext()
		appState.canvas.mixedDownContext = mixedDownContext
		spyOn(clearContext, 'default')

		subject()

		expect(clearContext.default).toHaveBeenCalledWith(mixedDownContext)
	})
})
