// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { getCurrentContext } from '../canvas'
import { Context } from '../dom'

const fillPath: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext.default()
		context.closePath()
		context.fill()
	}

export default fillPath
