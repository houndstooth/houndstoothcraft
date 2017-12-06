import { NullarySideEffector } from '../../utilities'
import { state } from '../state'
import clearContext from './clearContext'

const clearMixedDownContext: NullarySideEffector =
	(): void =>	{
		clearContext(state.canvas.mixedDownContext)
	}

export default clearMixedDownContext
