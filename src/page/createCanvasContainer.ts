import { getCanvasDimensions } from '../canvas'
import { document } from '../utilities/windowWrapper'
import scaleElement from './scaleElement'
import { PageElement } from './types'
import Dimensions from './types/Dimensions'

const createCanvasContainer: { ({}?: { canvasDimensions?: Dimensions }): PageElement } = params => {
	const { canvasDimensions = undefined } = params || {}
	const dimensions = canvasDimensions || getCanvasDimensions()

	const canvasContainer = document.createElement('div')
	canvasContainer.classList.add('canvas-container')

	scaleElement({ element: canvasContainer, dimensions })

	document.body.appendChild(canvasContainer)

	return canvasContainer
}

export default createCanvasContainer
