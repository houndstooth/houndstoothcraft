// tslint:disable:no-unsafe-any

import { Context, getCurrentContext, Px } from '../../app'
import { getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import { NullarySideEffector } from '../../utilities'
import { Color, parseColor } from '../color'

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
