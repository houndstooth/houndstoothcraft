import { state } from '../state'
import { defaults } from '../store'
import { document } from '../utilities/windowWrapper'
import { scaleElement } from './scaleElement'
import { PageElement } from './types'

const createCanvasContainer: () => PageElement = () => {
	const { canvasSize = defaults.DEFAULT_CANVAS_SIZE } = state.mainHoundstooth.basePattern.viewSettings || {}

	const canvasContainer = document.createElement('div')
	canvasContainer.classList.add('canvas-container')

	scaleElement({ element: canvasContainer, dimensions: [ canvasSize, canvasSize ] })

	document.body.appendChild(canvasContainer)

	return canvasContainer
}

export { createCanvasContainer }
