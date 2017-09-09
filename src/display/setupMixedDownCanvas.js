import store from '../../store'
import deleteElementIfExists from './deleteElementIfExists'
import getCanvasSize from './getCanvasSize'

export default () => {
	deleteElementIfExists('.mixed-down-canvas')

	const mixedDownCanvas = document.createElement('canvas')
	mixedDownCanvas.classList.add('mixed-down-canvas')
	document.body.appendChild(mixedDownCanvas)

	const canvasSize = getCanvasSize()
	mixedDownCanvas.width = canvasSize[ 0 ]
	mixedDownCanvas.height = canvasSize[ 1 ]

	mixedDownCanvas.style.display = 'none'

	store.mixedDownContext = mixedDownCanvas.getContext('2d')
}
