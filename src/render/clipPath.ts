import { getCurrentContext } from '../canvas'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'

const clipPath: NullarySideEffector = () => {
	const context = getCurrentContext()
	context.save()
	context.clip()
}

export { clipPath }
