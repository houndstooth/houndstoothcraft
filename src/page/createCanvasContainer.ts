import { getCanvasDimensions } from '../canvas'
import { document } from '../utilities/windowWrapper'
import scaleElement from './scaleElement'

const createCanvasContainer = ({ canvasDimensions }: { canvasDimensions? } = {}) => {
	const dimensions = canvasDimensions || getCanvasDimensions()

	const canvasContainer = document.createElement('div')
	canvasContainer.classList.add('canvas-container')

	scaleElement({ element: canvasContainer, dimensions })

	document.body.appendChild(canvasContainer)

	return canvasContainer
}

export default createCanvasContainer
