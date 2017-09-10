import state from '../../state'
import documentUtilities from '../utilities/documentUtilities'
import getCanvasSize from './getCanvasSize'

export default () => {
	documentUtilities.deleteElementIfExists('.mixed-down-canvas')

	const mixedDownCanvas = document.createElement('canvas')
	mixedDownCanvas.classList.add('mixed-down-canvas')
	document.body.appendChild(mixedDownCanvas)

	const canvasSize = getCanvasSize()
	mixedDownCanvas.width = canvasSize[ 0 ]
	mixedDownCanvas.height = canvasSize[ 1 ]

	mixedDownCanvas.style.canvas = 'none'

	state.mixedDownContext = mixedDownCanvas.getContext('2d')
}
