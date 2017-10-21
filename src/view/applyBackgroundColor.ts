import { getCurrentContext } from '../canvas'
import { parseColor } from '../render'
import { state } from '../state'
import { defaults } from '../store'
import { NullarySideEffector } from '../utilities/types'

const applyBackgroundColor: NullarySideEffector = () => {
	const { backgroundColor = defaults.DEFAULT_BACKGROUND_COLOR } = state.mainHoundstooth.basePattern.colorSettings || {}
	if (backgroundColor.a === 0) {
		return
	}

	const { canvasSize = defaults.DEFAULT_CANVAS_SIZE } = state.mainHoundstooth.basePattern.viewSettings || {}

	const context = getCurrentContext()
	context.fillStyle = parseColor(backgroundColor)
	context.fillRect(0, 0, canvasSize, canvasSize)
}

export { applyBackgroundColor }
