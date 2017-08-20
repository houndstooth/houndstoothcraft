import store from '../../store'
import getCanvasSize from './getCanvasSize'
import interfaceUtilities from '../utilities/interfaceUtilities'
import setupCanvasContainer from './setupCanvasContainer'

export default () => {
	const canvasContainer = document.querySelector('.canvas-container') || setupCanvasContainer()
	canvasContainer.innerHTML = ''

	const canvasSize = getCanvasSize()
	interfaceUtilities.setElementDimensions(canvasContainer, canvasSize)

	store.contexts = interfaceUtilities.layerIterator().map(() => {
		const canvas = document.createElement('canvas')
		canvas.style.position = 'absolute'
		canvas.width = canvasSize[ 0 ]
		canvas.height = canvasSize[ 1 ]

		canvasContainer.appendChild(canvas)

		return canvas.getContext('2d')
	})
}
