import store from '../../store'
import setupCanvasContainer from '../render/setupCanvasContainer'
import interfaceUtilities from '../utilities/interfaceUtilities'
import getCanvasSize from '../render/getCanvasSize'

export default () => {
	store.canvases = []

	const canvasContainer = document.querySelector('.canvas-container') || setupCanvasContainer()
	canvasContainer.innerHTML = ''

	const canvasSize = getCanvasSize()
	interfaceUtilities.setElementDimensions(canvasContainer, canvasSize)

	interfaceUtilities.layerIterator().forEach(canvasIndex => {
		const canvasClass = `real-canvas-${canvasIndex}`

		const canvas = document.createElement('canvas')
		canvas.classList.add(canvasClass)
		canvas.style.position = 'absolute'
		canvas.width = canvasSize[ 0 ]
		canvas.height = canvasSize[ 1 ]

		canvasContainer.appendChild(canvas)

		store.canvases.push(canvas)
	})
}
