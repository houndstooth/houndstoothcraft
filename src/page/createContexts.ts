import { layerIterator } from '../canvas'
import { state } from '../state'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'
import { document } from '../utilities/windowWrapper'
import { createCanvasContainer } from './createCanvasContainer'
import createContext from './createContext'

const createContexts: NullarySideEffector = () => {
	const canvasContainer = document.querySelector('.canvas-container') || createCanvasContainer()
	canvasContainer.innerHTML = ''

	state.contexts = layerIterator().map(() => createContext({ canvasContainer }))
}

export { createContexts }
