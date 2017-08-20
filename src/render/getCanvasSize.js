import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'

export default () => {
	const viewSettings = store.mainHoundstooth.basePattern.viewSettings
	const canvasSize = viewSettings && viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE

	const oblong = canvasSize instanceof Array
	const width = oblong ? canvasSize[0] : canvasSize
	const height = oblong ? canvasSize[1] : canvasSize

	return [ width, height ]
}
