import { getCanvasDimensions, layerIterator } from '../canvas'
import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'
import { document } from '../utilities/windowWrapper'
import { createCanvasContainer } from './createCanvasContainer'
import createContext from './createContext'

const createContexts: NullarySideEffector = (() => {
	const canvasDimensions = getCanvasDimensions()

	const canvasContainer = document.querySelector('.canvas-container') || createCanvasContainer({ canvasDimensions })
	canvasContainer.innerHTML = ''

	state.contexts = layerIterator().map(() => createContext({ canvasContainer, canvasDimensions }))
}) as NullarySideEffector

// tslint:disable-next-line:no-default-export
export { createContexts }
