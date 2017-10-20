import { Dimension } from '../page'
import { state } from '../state'
import { defaults } from '../store'

const getCanvasDimensions: () => Dimension[] = () => {
	const canvasSize = state.mainHoundstooth.basePattern.viewSettings.canvasSize || defaults.DEFAULT_CANVAS_SIZE

	return [ canvasSize, canvasSize ] as Dimension[]
}

export { getCanvasDimensions }
