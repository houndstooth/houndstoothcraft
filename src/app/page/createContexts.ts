// tslint:disable:no-unsafe-any

import * as from from '../../from'
import { Layer } from '../../pattern'
import { state } from '../../state'
import * as to from '../../to'
import { codeUtilities, NullarySideEffector } from '../../utilities'
import { getSetting } from '../store'
import createContext from './createContext'
import createMixedDownContext from './createMixedDownContext'
import scaleCanvasContainer from './scaleCanvasContainer'
import { PageElement } from './types'

const createContexts: NullarySideEffector =
	(): void => {
		const canvasContainer: PageElement = scaleCanvasContainer()
		canvasContainer.innerHTML = ''
		state.mixedDownContext = createMixedDownContext()

		state.contexts = layerIterator().map(() => createContext({ canvasContainer }))
	}

const layerIterator: () => Layer[] =
	(): Layer[] => {
		const endLayer: Layer = getSetting.default('endLayer')

		const layerCount: number = from.Layer(endLayer) + 1

		return to.Layers(codeUtilities.iterator(layerCount))
	}

export default createContexts
