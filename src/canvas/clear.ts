import state from '../state'
import { Dimension, Context } from '../page'
import getCanvasDimensions from './getCanvasDimensions'
import { NullarySideEffector } from '../utilities/types'

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

const clearContext: {
	({}: { context: Context, canvasDimensions: Dimension[] }): void,
} = ({ context, canvasDimensions }) => {
	context.clearRect(0, 0, canvasDimensions[ 0 ], canvasDimensions[ 1 ])
}

export default clear
