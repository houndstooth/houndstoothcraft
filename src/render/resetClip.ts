import { getCurrentContext } from '../canvas'
import { NullarySideEffector } from '../utilities/types'

const resetClip: NullarySideEffector = () => {
	const context = getCurrentContext()
	context.restore()
}

export { resetClip }
