// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { Context } from '../page'
import { getCurrentContext } from './getCurrentContext'

const fillPath: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext()
		context.closePath()
		context.fill()
	}

export { fillPath }
