import state from '../../state'
import setupCanvasContainer from './setupCanvasContainer'
import canvas from '../canvas'
import setupContext from './setupContext'

export default () => {
	const canvasSize = canvas.getCanvasSize()

	const canvasContainer = document.querySelector('.canvas-container') || setupCanvasContainer({ canvasSize })
	canvasContainer.innerHTML = ''

	state.contexts = canvas.layerIterator().map(() => setupContext({ canvasContainer, canvasSize }))
}
