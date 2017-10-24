import { to } from '../index'
import { getFromBaseOrDefaultPattern } from '../store'
import { document } from '../utilities/windowWrapper'
import { scaleElement } from './scaleElement'
import { PageElement, Px } from './types'

const createCanvasContainer: () => PageElement = () => {
	const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')

	const canvasContainer = document.createElement('div')
	canvasContainer.classList.add('canvas-container')

	scaleElement({ element: canvasContainer, dimensions: to.Dimensions([ canvasSize, canvasSize ]) })

	document.body.appendChild(canvasContainer)

	return canvasContainer
}

export { createCanvasContainer }
