import state from '../../state'
import getCanvasSize from './getCanvasSize'
import documentUtilities from '../utilities/documentUtilities'
import setupCanvasContainer from './setupCanvasContainer'
import layerIterator from './layerIterator'

export default () => {
	const canvasContainer = document.querySelector('.canvas-container') || setupCanvasContainer()
	canvasContainer.innerHTML = ''

	const canvasSize = getCanvasSize()
	documentUtilities.setElementDimensions(canvasContainer, canvasSize)

	state.contexts = layerIterator().map(() => {
		const canvas = document.createElement('canvas')
		canvas.style.position = 'absolute'
		canvas.width = canvasSize[ 0 ]
		canvas.height = canvasSize[ 1 ]

		canvasContainer.appendChild(canvas)

		return canvas.getContext('2d')
	})
}