import { getCanvasDimensions, getCurrentContext } from '../canvas'
import { parseColor } from '../render'
import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'

const applyBackgroundColor: NullarySideEffector = (() => {
	const { backgroundColor } = state.mainHoundstooth.basePattern.colorSettings
	if (!backgroundColor) {
		return
	}

	const canvasDimensions = getCanvasDimensions()

	const context = getCurrentContext()
	context.fillStyle = parseColor(backgroundColor)
	context.fillRect(0, 0, canvasDimensions[ 0 ], canvasDimensions[ 1 ])
}) as NullarySideEffector

export { applyBackgroundColor }
