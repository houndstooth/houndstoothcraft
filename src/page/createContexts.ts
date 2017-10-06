import state from '../state'
import { getCanvasSize, layerIterator } from '../canvas'
import { document } from '../utilities/windowWrapper'
import createCanvasContainer from './createCanvasContainer'
import createContext from './createContext'

const createContexts = () => {
	const canvasSize = getCanvasSize()

	const canvasContainer = document.querySelector('.canvas-container') || createCanvasContainer({ canvasSize })
	canvasContainer.innerHTML = ''

	state.contexts = layerIterator().map(() => createContext({ canvasContainer, canvasSize }))
}

export default createContexts
