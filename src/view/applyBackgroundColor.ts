// tslint:disable:no-unsafe-any

import { Context, Px } from '../page'
import { Color, getCurrentContext, parseColor } from '../render'
import { getFromBaseOrDefaultPattern } from '../store'
import { NullarySideEffector } from '../utilities/types'

const applyBackgroundColor: NullarySideEffector =
	(): void => {
		const backgroundColor: Color = getFromBaseOrDefaultPattern('backgroundColor')
		if (backgroundColor.a === 0) {
			return
		}

		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')

		const context: Context = getCurrentContext()
		context.fillStyle = parseColor(backgroundColor)
		context.fillRect(0, 0, canvasSize, canvasSize)
	}

export { applyBackgroundColor }
