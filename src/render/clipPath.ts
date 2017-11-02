// tslint:disable:no-unsafe-any

import { Context } from '../page'
import { getCurrentContext } from '../render'
import { NullarySideEffector } from '../utilities/types'

const clipPath: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext()
		context.save()
		context.clip()
	}

export { clipPath }
