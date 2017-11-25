// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { Context } from '../page'
import { main as getCurrentContext } from './getCurrentContext'

const resetClip: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext()
		context.restore()
	}

export { resetClip as main }
