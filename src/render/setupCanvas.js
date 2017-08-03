import canvas from './canvas'
import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'
import colorUtilities from '../utilities/colorUtilities'
import context from './context'

export default () => {
	const canvasSize = store.mainHoundstooth.basePattern.viewSettings && store.mainHoundstooth.basePattern.viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
	canvas.width = canvasSize
	canvas.height = canvasSize

	const backgroundColor = store.mainHoundstooth.basePattern.colorSettings && store.mainHoundstooth.basePattern.colorSettings.backgroundColor
	if (backgroundColor) {
		context.fillStyle = colorUtilities.parseColor(backgroundColor[ 0 ])
		context.fillRect(0, 0, canvas.width, canvas.height)
	}
}
