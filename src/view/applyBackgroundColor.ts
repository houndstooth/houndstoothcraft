import { getCurrentContext } from '../canvas'
import { parseColor } from '../render'
import { ColorSettings, getSetting, ViewSettings } from '../store'
import { NullarySideEffector } from '../utilities/types'

const applyBackgroundColor: NullarySideEffector = () => {
	const { backgroundColor }: ColorSettings = getSetting('color')
	if (backgroundColor.a === 0) {
		return
	}

	const { canvasSize }: ViewSettings = getSetting('view')

	const context = getCurrentContext()
	context.fillStyle = parseColor(backgroundColor)
	context.fillRect(0, 0, canvasSize, canvasSize)
}

export { applyBackgroundColor }
