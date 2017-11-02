// tslint:disable:no-unsafe-any

import { Context } from '../page'
import { getCurrentContext } from '../render'
import { NullarySideEffector } from '../utilities/types'

const resetClip: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext()
		context.restore()
	}

export { resetClip }
