import { getCurrentContext } from '../canvas'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'

const resetClip: NullarySideEffector = () => {
	const context = getCurrentContext()
	context.restore()
}

export { resetClip }
