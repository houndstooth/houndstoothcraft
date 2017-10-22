import { getCurrentContext } from '../canvas'
import { ColorSettings, getFromBaseOrDefaultPattern } from '../store'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'

const applyOpacity: NullarySideEffector = () => {
	const { opacity }: ColorSettings = getFromBaseOrDefaultPattern('color')
	if (!opacity || opacity === 1) {
		return
	}

	const context = getCurrentContext()
	context.globalAlpha = opacity
}

export { applyOpacity }
