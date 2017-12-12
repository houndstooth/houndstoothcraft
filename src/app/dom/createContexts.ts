// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../constants'
import { Layer } from '../../types'
import { codeUtilities, from, NullarySideEffector, to } from '../../utilities'
import { appState } from '../appState'
import createContext from './createContext'
import { Dimensions } from './types'

const createContexts: NullarySideEffector =
	(): void => {
		scaleElement({ element: appState.dom.canvasContainer, dimensions: to.Dimensions([ CANVAS_SIZE, CANVAS_SIZE ]) })
		appState.dom.canvasContainer.innerHTML = ''

		appState.render.contexts = layerIterator().map(createContext)
	}

const layerIterator: () => Layer[] =
	(): Layer[] => {
		const endLayer: Layer = appState.controls.endLayer

		const layerCount: number = from.Layer(endLayer) + 1

		return to.Layers(codeUtilities.iterator(layerCount))
	}

const scaleElement: (_: { dimensions: Dimensions, element: HTMLElement }) => void =
	({ dimensions, element }: { dimensions: Dimensions, element: HTMLElement }): void => {
		const [ x, y ] = from.Dimensions(dimensions)
		element.style.width = inPx(x)
		element.style.height = inPx(y)
	}

const inPx: (px: number) => string =
	(px: number): string => `${px}px`

export default createContexts
