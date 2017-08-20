import colorUtilities from '../utilities/colorUtilities'
import store from '../../store'
import getCurrentContext from './getCurrentContext'
import getCanvasSize from './getCanvasSize'

export default () => {
	const colorSettings = store.mainHoundstooth.basePattern.colorSettings
	const backgroundColor = colorSettings && colorSettings.backgroundColor
	if (!backgroundColor) return

	const canvasSize = getCanvasSize()

	const context = getCurrentContext()
	context.fillStyle = colorUtilities.parseColor(backgroundColor)
	context.fillRect(0, 0, canvasSize[ 0 ], canvasSize[ 1 ])
}
