// tslint:disable:no-unsafe-any

import { Context, getCurrentContext, getFromBaseOrDefaultPattern, Px } from '../../app'
import { NullarySideEffector } from '../../utilities'
import { Color, parseColor } from '../color'

const applyBackgroundColor: NullarySideEffector =
	(): void => {
		const backgroundColor: Color = getFromBaseOrDefaultPattern.main('backgroundColor')
		if (backgroundColor.a === 0) {
			return
		}

		const canvasSize: Px = getFromBaseOrDefaultPattern.main('canvasSize')

		const context: Context = getCurrentContext.main()
		context.fillStyle = parseColor.main(backgroundColor)
		context.fillRect(0, 0, canvasSize, canvasSize)
	}

export { applyBackgroundColor as main }
