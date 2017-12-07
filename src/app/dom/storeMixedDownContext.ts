// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../constants'
import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { documentWrapper } from './windowWrapper'

const storeMixedDownContext: NullarySideEffector =
	(): void => {
		appState.canvas.mixedDownContext = documentWrapper.querySelector('#mixed-down-canvas').getContext('2d')
		appState.canvas.mixedDownContext.canvas.width = CANVAS_SIZE
		appState.canvas.mixedDownContext.canvas.height = CANVAS_SIZE
	}

export default storeMixedDownContext
