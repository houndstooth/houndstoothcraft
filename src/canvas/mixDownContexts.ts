import { state } from '../state'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'

const mixDownContexts: NullarySideEffector = () => {
	state.contexts.forEach(context => {
		if (state.mixedDownContext) {
			state.mixedDownContext.drawImage(context.canvas, 0, 0)
		}
	})
}

export { mixDownContexts }
