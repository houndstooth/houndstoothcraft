import store from '../../store'
import getCurrentContext from '../render/getCurrentContext'

export default () => {
	const colorSettings = store.mainHoundstooth.basePattern.colorSettings
	if (!(colorSettings && colorSettings.opacity) || colorSettings.opacity === 1) return

	const context = getCurrentContext()
	context.globalAlpha = colorSettings.opacity
}
