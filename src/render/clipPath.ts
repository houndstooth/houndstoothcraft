// tslint:disable:no-unsafe-any

import { getCurrentContext } from '../canvas'
import { Context } from '../page'
import { NullarySideEffector } from '../utilities/types'

const clipPath: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext()
		context.save()
		context.clip()
	}

export { clipPath }
