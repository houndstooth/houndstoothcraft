import { parseColor } from '../render'
import state from '../state'
import { getCanvasSize, getCurrentContext } from '../canvas'

const applyBackgroundColor = () => {
	const colorSettings = state.mainHoundstooth.basePattern.colorSettings
	const backgroundColor = colorSettings && colorSettings.backgroundColor
	if (!backgroundColor) {
		return
	}

	const canvasSize = getCanvasSize()

	const context = getCurrentContext()
	context.fillStyle = parseColor(backgroundColor)
	context.fillRect(0, 0, canvasSize[ 0 ], canvasSize[ 1 ])
}

export default applyBackgroundColor
