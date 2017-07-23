import context from './context'
import store from '../../store'
import houndstoothDefaults from '../state/houndstoothDefaults'

export default () => {
	const canvasSize = store.currentState.mainHoundstooth.basePattern.viewSettings && store.currentState.mainHoundstooth.basePattern.viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
	context.clearRect(0, 0, canvasSize, canvasSize)
}
