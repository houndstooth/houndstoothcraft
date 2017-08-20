import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'

export default () => {
	const viewSettings = store.mainHoundstooth.basePattern.viewSettings
	const canvasSize = viewSettings && viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
	store.contexts.forEach(context => context.clearRect(0, 0, canvasSize, canvasSize))
	store.mixedDownCanvas && store.mixedDownCanvas.getContext('2d').clearRect(0, 0, canvasSize, canvasSize)
}
