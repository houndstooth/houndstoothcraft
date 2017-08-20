import colorUtilities from '../utilities/colorUtilities'
import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'
import getCurrentContext from './getCurrentContext'

export default () => {
	const colorSettings = store.mainHoundstooth.basePattern.colorSettings
	const backgroundColor = colorSettings && colorSettings.backgroundColor
	if (!backgroundColor) return

	const viewSettings = store.mainHoundstooth.basePattern.viewSettings
	const canvasSize = viewSettings && viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE

	const context = getCurrentContext()
	context.fillStyle = colorUtilities.parseColor(backgroundColor[ 0 ])
	context.fillRect(0, 0, canvasSize, canvasSize)
}
