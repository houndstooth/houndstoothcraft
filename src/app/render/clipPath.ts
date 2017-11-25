// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { Context } from '../page'
import { main as getCurrentContext } from './getCurrentContext'

const clipPath: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext()
		context.save()
		context.clip()
	}

export { clipPath as main }
