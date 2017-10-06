import state from '../state'
import getCanvasSize from './getCanvasSize'

const clear = () => {
	const canvasSize = getCanvasSize()
	state.contexts.forEach(context => clearContext({ context, canvasSize }))

	const mixedDownContext = state.mixedDownContext
	mixedDownContext && clearContext({ context: mixedDownContext, canvasSize })
}

const clearContext = ({ context, canvasSize }) => {
	context.clearRect(0, 0, canvasSize[ 0 ], canvasSize[ 1 ])
}

export default clear
