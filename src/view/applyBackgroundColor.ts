import { getCurrentContext } from '../canvas'
import { parseColor } from '../render'
import { ColorSettings, getFromBaseOrDefaultPattern, ViewSettings } from '../store'
import { NullarySideEffector } from '../utilities/types/NullarySideEffector'

const applyBackgroundColor: NullarySideEffector = () => {
	const { backgroundColor }: ColorSettings = getFromBaseOrDefaultPattern('color')
	if (backgroundColor.a === 0) {
		return
	}

	const { canvasSize }: ViewSettings = getFromBaseOrDefaultPattern('view')

	const context = getCurrentContext()
	context.fillStyle = parseColor(backgroundColor)
	context.fillRect(0, 0, canvasSize, canvasSize)
}

export { applyBackgroundColor }
