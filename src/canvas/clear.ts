import { Context, Dimension } from '../page'
import { state } from '../state'
import { getFromBaseOrDefaultPattern } from '../store'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'

const clear: NullarySideEffector = () => {
	const canvasSize: Dimension = getFromBaseOrDefaultPattern('canvasSize')
	state.contexts.forEach(context => {
		clearContext({ context, canvasSize })
	})

	const mixedDownContext = state.mixedDownContext
	if (mixedDownContext) {
		clearContext({ context: mixedDownContext, canvasSize })
	}
}

const clearContext: (_: {
	canvasSize: Dimension, context: Context,
}) => void = ({ canvasSize, context }) => {
	context.clearRect(0, 0, canvasSize, canvasSize)
}

export { clear }
