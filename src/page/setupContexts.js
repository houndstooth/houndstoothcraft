import state from '../../state'
import setElementDimensions from './setElementDimensions'
import setupCanvasContainer from './setupCanvasContainer'
import canvas from '../canvas'

export default () => {
	const canvasContainer = document.querySelector('.canvas-container') || setupCanvasContainer()
	canvasContainer.innerHTML = ''

	const canvasSize = canvas.getCanvasSize()
	setElementDimensions(canvasContainer, canvasSize)

	state.contexts = canvas.layerIterator().map(() => {
		const canvas = document.createElement('canvas')
		canvas.style.position = 'absolute'
		canvas.width = canvasSize[ 0 ]
		canvas.height = canvasSize[ 1 ]

		canvasContainer.appendChild(canvas)

		return canvas.getContext('2d')
	})
}
