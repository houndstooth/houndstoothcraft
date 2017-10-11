import state from '../state'
import { Dimensions } from '../page'
import getCanvasDimensions from './getCanvasDimensions'

const clear: { (): void } = () => {
	const canvasDimensions = getCanvasDimensions()
	state.contexts.forEach(context => clearContext({ context, canvasDimensions }))

	const mixedDownContext = state.mixedDownContext
	if (mixedDownContext) {
		clearContext({ context: mixedDownContext, canvasDimensions })
	}
}

type ClearContext = { ({}: { context: any, canvasDimensions: Dimensions }): void }

const clearContext: ClearContext = ({ context, canvasDimensions }) => {
	context.clearRect(0, 0, canvasDimensions[ 0 ], canvasDimensions[ 1 ])
}

export default clear
