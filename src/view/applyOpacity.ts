import state from '../state'
import { getCurrentContext } from '../canvas'
import { NullarySideEffector } from '../utilities/types'

const applyOpacity: NullarySideEffector = (() => {
	const colorSettings = state.mainHoundstooth.basePattern.colorSettings
	if (!(colorSettings && colorSettings.opacity) || colorSettings.opacity === 1) {
		return
	}

	const context = getCurrentContext()
	context.globalAlpha = colorSettings.opacity
}) as NullarySideEffector

export default applyOpacity
