import { getCurrentContext } from '../canvas'
import { ColorSettings, getSetting } from '../store'
import { NullarySideEffector } from '../utilities/types'

const applyOpacity: NullarySideEffector = () => {
	const { opacity }: ColorSettings = getSetting('color')
	if (!opacity || opacity === 1) {
		return
	}

	const context = getCurrentContext()
	context.globalAlpha = opacity
}

export { applyOpacity }
