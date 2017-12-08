// tslint:disable:no-unsafe-any

import { Layer } from '../../pattern'
import { codeUtilities, from, NullarySideEffector, to } from '../../utilities'
import { appState } from '../appState'
import createContext from './createContext'
import scaleCanvasContainer from './scaleCanvasContainer'

const createContexts: NullarySideEffector =
	(): void => {
		const canvasContainer: HTMLElement = scaleCanvasContainer()
		canvasContainer.innerHTML = ''

		appState.canvas.contexts = layerIterator().map(() => createContext({ canvasContainer }))
	}

const layerIterator: () => Layer[] =
	(): Layer[] => {
		const endLayer: Layer = appState.controls.endLayer

		const layerCount: number = from.Layer(endLayer) + 1

		return to.Layers(codeUtilities.iterator(layerCount))
	}

export default createContexts
