// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../constants'
import { NullarySideEffector } from '../../utilities'
import { state } from '../state'
import { documentWrapper } from './windowWrapper'

const storeMixedDownContext: NullarySideEffector =
	(): void => {
		state.canvas.mixedDownContext = documentWrapper.querySelector('#mixed-down-canvas').getContext('2d')
		state.canvas.mixedDownContext.canvas.width = CANVAS_SIZE
		state.canvas.mixedDownContext.canvas.height = CANVAS_SIZE
	}

export default storeMixedDownContext
