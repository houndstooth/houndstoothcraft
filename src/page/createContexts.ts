import state from '../state'
import { getCanvasDimensions, layerIterator } from '../canvas'
import { document } from '../utilities/windowWrapper'
import createCanvasContainer from './createCanvasContainer'
import createContext from './createContext'

const createContexts = () => {
	const canvasDimensions = getCanvasDimensions()

	const canvasContainer = document.querySelector('.canvas-container') || createCanvasContainer({ canvasDimensions })
	canvasContainer.innerHTML = ''

	state.contexts = layerIterator().map(() => createContext({ canvasContainer, canvasDimensions }))
}

export default createContexts
