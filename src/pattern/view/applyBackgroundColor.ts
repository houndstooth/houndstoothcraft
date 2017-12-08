// tslint:disable:no-unsafe-any

import { getCurrentContext } from '../../app'
import { CANVAS_SIZE } from '../../constants'
import { from, NullarySideEffector } from '../../utilities'
import { Color, parseColor } from '../color'
import { get } from '../patternState'

const applyBackgroundColor: NullarySideEffector =
	(): void => {
		const backgroundColor: Color = get('backgroundColor')
		if (backgroundColor.a === 0) {
			return
		}

		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.fillStyle = parseColor.default(backgroundColor)
		context.fillRect(0, 0, from.Px(CANVAS_SIZE), from.Px(CANVAS_SIZE))
	}

export default applyBackgroundColor
