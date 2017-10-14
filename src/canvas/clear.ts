import state from '../state'
import { Dimensions } from '../page'
import getCanvasDimensions from './getCanvasDimensions'
import { NullarySideEffector } from '../utilities/types'

const clear: NullarySideEffector = () => {
	const canvasDimensions = getCanvasDimensions() as Dimensions
	state.contexts.forEach(context => clearContext({ context, canvasDimensions }))

	const mixedDownContext = state.mixedDownContext
	if (mixedDownContext) {
		clearContext({ context: mixedDownContext, canvasDimensions })
	}
}

type ClearContext = { ({}: { context: CanvasRenderingContext2D, canvasDimensions: Dimensions }): void }

const clearContext: ClearContext = ({ context, canvasDimensions }) => {
	context.clearRect(0, 0, canvasDimensions[ 0 ], canvasDimensions[ 1 ])
}

export default clear
