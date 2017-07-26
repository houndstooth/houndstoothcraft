import canvas from './canvas'
import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'

export default () => {
	const canvasSize = store.mainHoundstooth.basePattern.viewSettings && store.mainHoundstooth.basePattern.viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
	canvas.width = canvasSize
	canvas.height = canvasSize
}
