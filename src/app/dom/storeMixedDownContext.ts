// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../constants'
import { from, globalWrapper, NullarySideEffector } from '../../utilities'
import { appState } from '../appState'

const storeMixedDownContext: NullarySideEffector =
	(): void => {
		// tslint:disable-next-line:max-line-length
		const mixedDownCanvas: HTMLCanvasElement = globalWrapper.document.querySelector('#mixed-down-canvas') as HTMLCanvasElement
		appState.canvas.mixedDownContext = mixedDownCanvas.getContext('2d') as CanvasRenderingContext2D
		appState.canvas.mixedDownContext.canvas.width = from.Px(CANVAS_SIZE)
		appState.canvas.mixedDownContext.canvas.height = from.Px(CANVAS_SIZE)
	}

export default storeMixedDownContext
