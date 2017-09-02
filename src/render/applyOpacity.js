import store from '../../store'
import renderUtilities from '../utilities/renderUtilities'

export default () => {
	const colorSettings = store.mainHoundstooth.basePattern.colorSettings
	if (!(colorSettings && colorSettings.opacity) || colorSettings.opacity === 1) return

	const context = renderUtilities.getCurrentContext()
	context.globalAlpha = colorSettings.opacity
}
