import { getCanvasSize } from '../canvas'
import { document } from '../utilities/windowWrapper'
import deleteElementIfExists from './deleteElementIfExists'

const createMixedDownCanvas = () => {
	deleteElementIfExists('.mixed-down-canvas')

	const mixedDownCanvas = document.createElement('canvas')
	mixedDownCanvas.classList.add('mixed-down-canvas')
	document.body.appendChild(mixedDownCanvas)

	const canvasSize = getCanvasSize()
	mixedDownCanvas.width = canvasSize[ 0 ]
	mixedDownCanvas.height = canvasSize[ 1 ]

	mixedDownCanvas.style.display = 'none'

	return mixedDownCanvas.getContext('2d')
}

export default createMixedDownCanvas
