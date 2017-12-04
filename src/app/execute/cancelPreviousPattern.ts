import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'

const cancelPreviousPattern: NullarySideEffector =
	(): void => {
		state.patternRef = Math.random()
	}

export default cancelPreviousPattern
