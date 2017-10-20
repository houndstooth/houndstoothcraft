import { getCurrentContext } from '../canvas'
import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'

const applyOpacity: NullarySideEffector = (() => {
	const { opacity } = state.mainHoundstooth.basePattern.colorSettings
	if (!opacity || opacity === 1) {
		return
	}

	const context = getCurrentContext()
	context.globalAlpha = opacity
}) as NullarySideEffector

export { applyOpacity }
