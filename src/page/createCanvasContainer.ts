import { getFromBaseOrDefaultPattern } from '../store'
import { document } from '../utilities/windowWrapper'
import { scaleElement } from './scaleElement'
import { Dimension, PageElement } from './types'

const createCanvasContainer: () => PageElement = () => {
	const canvasSize: Dimension = getFromBaseOrDefaultPattern('canvasSize')

	const canvasContainer = document.createElement('div')
	canvasContainer.classList.add('canvas-container')

	scaleElement({ element: canvasContainer, dimensions: [ canvasSize, canvasSize ] })

	document.body.appendChild(canvasContainer)

	return canvasContainer
}

export { createCanvasContainer }
