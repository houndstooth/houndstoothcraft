import { Context, Dimension } from '../page'
import state from '../state'
import { NullarySideEffector } from '../utilities/types'
import getCanvasDimensions from './getCanvasDimensions'

const clear: NullarySideEffector = (() => {
	const canvasDimensions = getCanvasDimensions()
	state.contexts.forEach(context => {
		clearContext({ context, canvasDimensions })
	})

	const mixedDownContext = state.mixedDownContext
	if (mixedDownContext) {
		clearContext({ context: mixedDownContext, canvasDimensions })
	}
}) as NullarySideEffector

const clearContext: (_: {
	canvasDimensions: Dimension[], context: Context,
}) => void = ({ canvasDimensions, context }) => {
	context.clearRect(0, 0, canvasDimensions[ 0 ], canvasDimensions[ 1 ])
}

export default clear
