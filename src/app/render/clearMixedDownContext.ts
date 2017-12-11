import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import clearContext from './clearContext'

const clearMixedDownContext: NullarySideEffector =
	(): void =>	{
		clearContext(appState.render.mixedDownContext)
	}

export default clearMixedDownContext
