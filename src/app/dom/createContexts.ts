// tslint:disable:no-unsafe-any

import { Layer } from '../../pattern'
import { codeUtilities, from, NullarySideEffector, to } from '../../utilities'
import { getSetting } from '../settings'
import { state } from '../state'
import createContext from './createContext'
import scaleCanvasContainer from './scaleCanvasContainer'
import { PageElement } from './types'

const createContexts: NullarySideEffector =
	(): void => {
		const canvasContainer: PageElement = scaleCanvasContainer()
		canvasContainer.innerHTML = ''

		state.canvas.contexts = layerIterator().map(() => createContext({ canvasContainer }))
	}

const layerIterator: () => Layer[] =
	(): Layer[] => {
		const endLayer: Layer = getSetting.default('endLayer')

		const layerCount: number = from.Layer(endLayer) + 1

		return to.Layers(codeUtilities.iterator(layerCount))
	}

export default createContexts
