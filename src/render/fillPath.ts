import { getCurrentContext } from '../canvas'
import { NullarySideEffector } from '../utilities/types'

const fillPath: NullarySideEffector = () => {
	const context = getCurrentContext()
	context.closePath()
	context.fill()
}

export { fillPath }
