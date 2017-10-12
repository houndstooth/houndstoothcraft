import { parseColor } from '../render'
import state from '../state'
import { getCanvasDimensions, getCurrentContext } from '../canvas'
import { NullarySideEffector } from '../utilities/types'

const applyBackgroundColor: NullarySideEffector = () => {
	const colorSettings = state.mainHoundstooth.basePattern.colorSettings
	const backgroundColor = colorSettings && colorSettings.backgroundColor
	if (!backgroundColor) {
		return
	}

	const canvasDimensions = getCanvasDimensions()

	const context = getCurrentContext()
	context.fillStyle = parseColor(backgroundColor)
	context.fillRect(0, 0, canvasDimensions[ 0 ], canvasDimensions[ 1 ])
}

export default applyBackgroundColor
