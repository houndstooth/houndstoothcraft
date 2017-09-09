import store from '../../store'
import display from '../display'

export default () => {
	const colorSettings = store.mainHoundstooth.basePattern.colorSettings
	if (!(colorSettings && colorSettings.opacity) || colorSettings.opacity === 1) return

	const context = display.getCurrentContext()
	context.globalAlpha = colorSettings.opacity
}
