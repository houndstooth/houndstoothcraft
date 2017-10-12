import state from '../state'
import { NullarySideEffector } from '../utilities/types'

const mixDownContexts: NullarySideEffector = () => state.contexts.forEach(context => {
	state.mixedDownContext.drawImage(context.canvas, 0, 0)
})

export default mixDownContexts
