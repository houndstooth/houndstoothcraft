// tslint:disable:no-unsafe-any

import { Context, getCurrentContext, Px } from '../../app'
// tslint:disable-next-line:no-reaching-imports
import { main as getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import { NullarySideEffector } from '../../utilities'
import { Color, parseColor } from '../color'

const applyBackgroundColor: NullarySideEffector =
	(): void => {
		const backgroundColor: Color = getFromBaseOrDefaultPattern('backgroundColor')
		if (backgroundColor.a === 0) {
			return
		}

		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')

		const context: Context = getCurrentContext.main()
		context.fillStyle = parseColor.main(backgroundColor)
		context.fillRect(0, 0, canvasSize, canvasSize)
	}

export { applyBackgroundColor as main }
