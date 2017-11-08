// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { Context } from '../page'
import { getCurrentContext } from './getCurrentContext'

const resetClip: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext()
		context.restore()
	}

export { resetClip }
