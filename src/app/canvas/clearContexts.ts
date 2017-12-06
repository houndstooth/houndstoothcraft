import { NullarySideEffector } from '../../utilities'
import { state } from '../state'
import clearContext from './clearContext'

const clearContexts: NullarySideEffector =
	(): void => {
		state.canvas.contexts.forEach(clearContext)
	}

export default clearContexts
