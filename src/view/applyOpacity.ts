import { getCurrentContext } from '../canvas'
import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'

const applyOpacity: NullarySideEffector = (() => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const colorSettings = basePattern.colorSettings
	if (!(colorSettings && colorSettings.opacity) || colorSettings.opacity === 1) {
		return
	}

	const context = getCurrentContext()
	context.globalAlpha = colorSettings.opacity
}) as NullarySideEffector

export { applyOpacity }
