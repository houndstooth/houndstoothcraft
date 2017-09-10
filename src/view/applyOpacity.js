import state from '../../state'
import display from '../display'

export default () => {
	const colorSettings = state.mainHoundstooth.basePattern.colorSettings
	if (!(colorSettings && colorSettings.opacity) || colorSettings.opacity === 1) return

	const context = display.getCurrentContext()
	context.globalAlpha = colorSettings.opacity
}
