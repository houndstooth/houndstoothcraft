import { NullarySideEffector } from '../../utilities'
import { state } from '../state'

const cancelPreviousPattern: NullarySideEffector =
	(): void => {
		state.execute.patternRef = Math.random()
	}

export default cancelPreviousPattern
