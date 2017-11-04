// tslint:disable:no-unsafe-any

import { Layer } from '../execute'
import { state } from '../state'
import { getFromBaseOrDefaultPattern } from '../store'
import { iterator } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { NullarySideEffector } from '../utilities/types'
import createContext from './createContext'
import { scaleCanvasContainer } from './scaleCanvasContainer'
import { PageElement } from './types'

const createContexts: NullarySideEffector =
	(): void => {
		const canvasContainer: PageElement = scaleCanvasContainer()
		canvasContainer.innerHTML = ''

		state.contexts = layerIterator().map(() => createContext({ canvasContainer }))
	}

const layerIterator: () => Layer[] =
	(): Layer[] => {
		const endLayer: Layer = getFromBaseOrDefaultPattern('endLayer')

		const layerCount: number = from.Layer(endLayer) + 1

		return to.Layers(iterator(layerCount))
	}

export { createContexts }
