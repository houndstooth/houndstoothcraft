import { NullarySideEffector } from '../../utilities'
import { getSetting } from '../settings'
import { state } from '../state'
import clearContext from './clearContext'

const clearMixedDownContext: NullarySideEffector =
	(): void =>	{
		clearContext({ canvasSize: getSetting.default('canvasSize'), context: state.canvas.mixedDownContext })
	}

export default clearMixedDownContext
