import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'

const cancelPreviousPattern: NullarySideEffector =
	(): void => {
		appState.execute.patternRef = Math.random()
	}

export default cancelPreviousPattern
