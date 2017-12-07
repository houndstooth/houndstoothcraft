// tslint:disable:no-unsafe-any

import { Context, getCurrentContext } from '../../app'
import { CANVAS_SIZE } from '../../constants'
import { NullarySideEffector } from '../../utilities'
import { Color, parseColor } from '../color'
import { get } from '../patternState'

const applyBackgroundColor: NullarySideEffector =
	(): void => {
		const backgroundColor: Color = get('backgroundColor')
		if (backgroundColor.a === 0) {
			return
		}

		const context: Context = getCurrentContext.default()
		context.fillStyle = parseColor.default(backgroundColor)
		context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
	}

export default applyBackgroundColor
