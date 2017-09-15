import state from '../../state'
import createCanvasContainer from './createCanvasContainer'
import canvas from '../canvas'
import createContext from './createContext'

export default () => {
	const canvasSize = canvas.getCanvasSize()

	const canvasContainer = document.querySelector('.canvas-container') || createCanvasContainer({ canvasSize })
	canvasContainer.innerHTML = ''

	state.contexts = canvas.layerIterator().map(() => createContext({ canvasContainer, canvasSize }))
}
