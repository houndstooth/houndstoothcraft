// tslint:disable:no-unsafe-any

import * as from from '../../from'
import { Layer } from '../../pattern'
import { state } from '../../state'
import * as to from '../../to'
import { codeUtilities, NullarySideEffector } from '../../utilities'
import { getSetting } from '../store'
import * as createContext from './createContext'
import { main as scaleCanvasContainer } from './scaleCanvasContainer'
import { PageElement } from './types'

const createContexts: NullarySideEffector =
	(): void => {
		const canvasContainer: PageElement = scaleCanvasContainer()
		canvasContainer.innerHTML = ''

		state.contexts = layerIterator().map(() => createContext.default({ canvasContainer }))
	}

const layerIterator: () => Layer[] =
	(): Layer[] => {
		const endLayer: Layer = getSetting.main('endLayer')

		const layerCount: number = from.Layer(endLayer) + 1

		return to.Layers(codeUtilities.iterator(layerCount))
	}

export { createContexts as main }
