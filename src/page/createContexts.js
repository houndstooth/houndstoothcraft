import state from '../../state'
import createCanvasContainer from './createCanvasContainer'
import { getCanvasSize, layerIterator } from '../canvas'
import createContext from './createContext'

export default () => {
	const canvasSize = getCanvasSize()

	const canvasContainer = document.querySelector('.canvas-container') || createCanvasContainer({ canvasSize })
	canvasContainer.innerHTML = ''

	state.contexts = layerIterator().map(() => createContext({ canvasContainer, canvasSize }))
}