import { Context, Px } from '../page'
import { state } from '../state'
import { getFromBaseOrDefaultPattern } from '../store'
import { NullarySideEffector } from '../utilities/types'

const clear: NullarySideEffector = () => {
	const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')
	state.contexts.forEach(context => {
		clearContext({ context, canvasSize })
	})

	const mixedDownContext = state.mixedDownContext
	if (mixedDownContext) {
		clearContext({ context: mixedDownContext, canvasSize })
	}
}

const clearContext: (_: { canvasSize: Px, context: Context }) => void = ({ canvasSize, context }) =>
	context.clearRect(0, 0, canvasSize, canvasSize)

export { clear }
