import state from '../../state'
import canvas from '../canvas'

export default () => {
	const colorSettings = state.mainHoundstooth.basePattern.colorSettings
	if (!(colorSettings && colorSettings.opacity) || colorSettings.opacity === 1) return

	const context = canvas.getCurrentContext()
	context.globalAlpha = colorSettings.opacity
}
