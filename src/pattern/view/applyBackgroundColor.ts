// tslint:disable:no-unsafe-any

import { Context, getCurrentContext, getSetting, Px } from '../../app'
import { NullarySideEffector } from '../../utilities'
import { Color, parseColor } from '../color'

const applyBackgroundColor: NullarySideEffector =
	(): void => {
		const backgroundColor: Color = getSetting.default('backgroundColor')
		if (backgroundColor.a === 0) {
			return
		}

		const canvasSize: Px = getSetting.default('canvasSize')

		const context: Context = getCurrentContext.default()
		context.fillStyle = parseColor.default(backgroundColor)
		context.fillRect(0, 0, canvasSize, canvasSize)
	}

export default applyBackgroundColor
