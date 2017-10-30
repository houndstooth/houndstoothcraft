// tslint:disable:no-unsafe-any

import { layerIterator } from '../canvas'
import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'
import { document } from '../utilities/windowWrapper'
import { createCanvasContainer } from './createCanvasContainer'
import createContext from './createContext'
import { PageElement } from './types'

const createContexts: NullarySideEffector =
	(): void => {
		const canvasContainer: PageElement = document.querySelector('.canvas-container') || createCanvasContainer()
		canvasContainer.innerHTML = ''

		state.contexts = layerIterator().map(() => createContext({ canvasContainer }))
	}

export { createContexts }
