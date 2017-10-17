import { getCanvasDimensions, getCurrentContext } from '../canvas'
import { parseColor } from '../render'
import state from '../state'
import { NullarySideEffector } from '../utilities/types'

const applyBackgroundColor: NullarySideEffector = (() => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const colorSettings = basePattern.colorSettings
	const backgroundColor = colorSettings && colorSettings.backgroundColor
	if (!backgroundColor) {
		return
	}

	const canvasDimensions = getCanvasDimensions()

	const context = getCurrentContext()
	context.fillStyle = parseColor(backgroundColor)
	context.fillRect(0, 0, canvasDimensions[ 0 ], canvasDimensions[ 1 ])
}) as NullarySideEffector

export default applyBackgroundColor
