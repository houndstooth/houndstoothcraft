import canvas from './canvas'
import store from '../../store'
import houndstoothDefaults from '../state/houndstoothDefaults'

export default () => {
	const canvasSize = store.currentState.mainHoundstooth.basePattern.viewSettings && store.currentState.mainHoundstooth.basePattern.viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
	canvas.width = canvasSize
	canvas.height = canvasSize
}
