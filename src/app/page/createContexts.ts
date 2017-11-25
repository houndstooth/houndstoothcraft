// tslint:disable:no-unsafe-any

import * as from from '../../from'
import { Layer } from '../../pattern'
import { state } from '../../state'
import * as to from '../../to'
import { codeUtilities, NullarySideEffector } from '../../utilities'
// tslint:disable-next-line:no-reaching-imports
import { main as getFromBaseOrDefaultPattern } from '../store/getFromBaseOrDefaultPattern'
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
		const endLayer: Layer = getFromBaseOrDefaultPattern('endLayer')

		const layerCount: number = from.Layer(endLayer) + 1

		return to.Layers(codeUtilities.iterator(layerCount))
	}

export { createContexts as main }
