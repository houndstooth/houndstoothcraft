// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../../constants'
import { from } from '../../../utilities'
import { appState } from '../../appState'

const setupMixedDownContext: () => void =
	(): void => {
		// tslint:disable-next-line:max-line-length
		appState.render.mixedDownContext = appState.dom.mixedDownCanvas.getContext('2d') as CanvasRenderingContext2D
		appState.dom.mixedDownCanvas.width = from.Px(CANVAS_SIZE)
		appState.dom.mixedDownCanvas.height = from.Px(CANVAS_SIZE)
	}

export default setupMixedDownContext
