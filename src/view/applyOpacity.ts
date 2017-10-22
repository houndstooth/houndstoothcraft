import { getCurrentContext } from '../canvas'
import { getFromBaseOrDefaultPattern } from '../store'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'

const applyOpacity: NullarySideEffector = () => {
	const opacity: number = getFromBaseOrDefaultPattern('opacity')
	if (!opacity || opacity === 1) {
		return
	}

	const context = getCurrentContext()
	context.globalAlpha = opacity
}

export { applyOpacity }
