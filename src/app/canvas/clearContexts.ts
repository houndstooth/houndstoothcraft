import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import clearContext from './clearContext'

const clearContexts: NullarySideEffector =
	(): void => {
		appState.canvas.contexts.forEach(clearContext)
	}

export default clearContexts
