import { getCurrentContext } from '../canvas'
import { Dimension } from '../page'
import { Color, parseColor } from '../render'
import { getFromBaseOrDefaultPattern } from '../store'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'

const applyBackgroundColor: NullarySideEffector = () => {
	const backgroundColor: Color = getFromBaseOrDefaultPattern('backgroundColor')
	if (backgroundColor.a === 0) {
		return
	}

	const canvasSize: Dimension = getFromBaseOrDefaultPattern('canvasSize')

	const context = getCurrentContext()
	context.fillStyle = parseColor(backgroundColor)
	context.fillRect(0, 0, canvasSize, canvasSize)
}

export { applyBackgroundColor }
