import state from '../../state'
import { houndstoothDefaults } from '../store'

const getCanvasSize = () => {
	const viewSettings = state.mainHoundstooth.basePattern.viewSettings
	const canvasSize = viewSettings && viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE

	const oblong = canvasSize instanceof Array
	const width = oblong ? canvasSize[0] : canvasSize
	const height = oblong ? canvasSize[1] : canvasSize

	return [ width, height ]
}

export default getCanvasSize
