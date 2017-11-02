// tslint:disable:no-unsafe-any

import { Context } from '../page'
import { getCurrentContext } from '../render'
import { NullarySideEffector } from '../utilities/types'

const fillPath: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext()
		context.closePath()
		context.fill()
	}

export { fillPath }
