// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { getCurrentContext } from '../canvas'
import { Context } from '../dom'

const clipPath: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext.default()
		context.save()
		context.clip()
	}

export default clipPath
