import setElementDimensions from './setElementDimensions'
import canvas from '../canvas'

export default ({ canvasSize } = {}) => {
	if (!canvasSize) canvasSize = canvas.getCanvasSize()

	const canvasContainer = document.createElement('div')
	canvasContainer.classList.add('canvas-container')

	setElementDimensions(canvasContainer, canvasSize)

	document.body.appendChild(canvasContainer)

	return canvasContainer
}
