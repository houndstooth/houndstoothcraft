// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { Context } from '../page'
import { getCurrentContext } from './getCurrentContext'

const clipPath: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext()
		context.save()
		context.clip()
	}

export { clipPath }
