import {
	clearContext,
	clearMixedDownContext,
	Context,
	NullarySideEffector,
	state,
} from '../../../../../src'
import { buildMockContext } from '../../../../helpers'

const subject: NullarySideEffector = clearMixedDownContext.default

describe('clear mixed down context', () => {
	it('gets the canvas size and the mixed down canvas, and clears', () => {
		const mixedDownContext: Context = buildMockContext()
		state.canvas.mixedDownContext = mixedDownContext
		spyOn(clearContext, 'default')

		subject()

		expect(clearContext.default).toHaveBeenCalledWith(mixedDownContext)
	})
})
