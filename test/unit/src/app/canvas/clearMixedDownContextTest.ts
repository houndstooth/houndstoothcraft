import {
	clearContext,
	clearMixedDownContext,
	Context,
	NullarySideEffector,
	setSetting,
	state,
	to,
} from '../../../../../src'
import { buildMockContext } from '../../../../helpers'

const subject: NullarySideEffector = clearMixedDownContext.default

describe('clear mixed down context', () => {
	it('gets the canvas size and the mixed down canvas, and clears', () => {
		setSetting.default('canvasSize', to.Px(312))
		const mixedDownContext: Context = buildMockContext()
		state.mixedDownContext = mixedDownContext
		spyOn(clearContext, 'default')

		subject()

		expect(clearContext.default).toHaveBeenCalledWith({ canvasSize: 312, context: mixedDownContext })
	})
})
