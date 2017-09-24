import state from '../state'
import { getCurrentContext } from '../canvas'

const applyOpacity = () => {
	const colorSettings = state.mainHoundstooth.basePattern.colorSettings
	if (!(colorSettings && colorSettings.opacity) || colorSettings.opacity === 1) return

	const context = getCurrentContext()
	context.globalAlpha = colorSettings.opacity
}

export default applyOpacity
