import store from '../../store'
import getCanvasSize from './getCanvasSize'

export default () => {
	const canvasSize = getCanvasSize()
	store.contexts.forEach(context => clearContext({ context, canvasSize }))

	const mixedDownContext = store.mixedDownCanvas && store.mixedDownCanvas.getContext('2d')
	mixedDownContext && clearContext({ context: mixedDownContext, canvasSize })
}

const clearContext = ({ context, canvasSize }) => {
	context.clearRect(0, 0, canvasSize[ 0 ], canvasSize[ 1 ])
}
