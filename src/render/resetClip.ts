// tslint:disable:no-unsafe-any

import { getCurrentContext } from '../canvas'
import { Context } from '../page'
import { NullarySideEffector } from '../utilities/types'

const resetClip: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext()
		context.restore()
	}

export { resetClip }
