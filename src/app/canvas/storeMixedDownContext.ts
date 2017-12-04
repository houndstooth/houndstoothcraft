// tslint:disable:no-unsafe-any

import { DEFAULT_CANVAS_SIZE } from '../../defaults'
import { state } from '../../state'
import { documentWrapper, NullarySideEffector } from '../../utilities'

const storeMixedDownContext: NullarySideEffector =
	(): void => {
		state.canvas.mixedDownContext = documentWrapper.querySelector('#mixed-down-canvas').getContext('2d')
		state.canvas.mixedDownContext.canvas.width = DEFAULT_CANVAS_SIZE
		state.canvas.mixedDownContext.canvas.height = DEFAULT_CANVAS_SIZE
	}

export default storeMixedDownContext
