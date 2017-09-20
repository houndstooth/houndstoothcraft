import setElementDimensions from './setElementDimensions'
import { getCanvasSize } from '../canvas'

export default ({ canvasSize } = {}) => {
	if (!canvasSize) canvasSize = getCanvasSize()

	const canvasContainer = document.createElement('div')
	canvasContainer.classList.add('canvas-container')

	setElementDimensions(canvasContainer, canvasSize)

	document.body.appendChild(canvasContainer)

	return canvasContainer
}
