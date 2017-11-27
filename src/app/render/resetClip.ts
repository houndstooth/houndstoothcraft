// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { getCurrentContext } from '../canvas'
import { Context } from '../page'

const resetClip: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext.default()
		context.restore()
	}

export default resetClip
