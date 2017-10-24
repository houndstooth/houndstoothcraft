import { getCurrentContext } from '../canvas'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'

const fillPath: NullarySideEffector = () => {
	const context = getCurrentContext()
	context.closePath()
	context.fill()
}

export { fillPath }
