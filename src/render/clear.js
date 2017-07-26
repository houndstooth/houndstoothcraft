import context from './context'
import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'

export default () => {
	const canvasSize = store.mainHoundstooth.basePattern.viewSettings && store.mainHoundstooth.basePattern.viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
	context.clearRect(0, 0, canvasSize, canvasSize)
}
