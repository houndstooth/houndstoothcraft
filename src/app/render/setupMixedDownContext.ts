// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../constants'
import { from, NullarySideEffector } from '../../utilities'
import { appState } from '../appState'

const setupMixedDownContext: NullarySideEffector =
	(): void => {
		// tslint:disable-next-line:max-line-length
		appState.render.mixedDownContext = appState.dom.mixedDownCanvas.getContext('2d') as CanvasRenderingContext2D
		appState.render.mixedDownContext.canvas.width = from.Px(CANVAS_SIZE)
		appState.render.mixedDownContext.canvas.height = from.Px(CANVAS_SIZE)
	}

export default setupMixedDownContext
