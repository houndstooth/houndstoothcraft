import { getCanvasSize } from '../canvas'
import { document } from '../utilities/windowWrapper'
import scaleElement from './scaleElement'

const createCanvasContainer = ({ canvasSize }: { canvasSize? } = {}) => {
	if (!canvasSize) {
		canvasSize = getCanvasSize()
	}

	const canvasContainer = document.createElement('div')
	canvasContainer.classList.add('canvas-container')

	scaleElement({ element: canvasContainer, dimensions: canvasSize })

	document.body.appendChild(canvasContainer)

	return canvasContainer
}

export default createCanvasContainer
