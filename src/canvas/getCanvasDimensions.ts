import { Dimension } from '../page'
import { state } from '../state'
import { defaults } from '../store'

const getCanvasDimensions: () => Dimension[] = () => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const viewSettings = basePattern.viewSettings || {}
	const canvasSize = viewSettings && viewSettings.canvasSize || defaults.DEFAULT_CANVAS_SIZE

	const oblong = canvasSize instanceof Array
	const width = oblong ? canvasSize[0] : canvasSize
	const height = oblong ? canvasSize[1] : canvasSize

	return [ width, height ] as Dimension[]
}

export { getCanvasDimensions }
