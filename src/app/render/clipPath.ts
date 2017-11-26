// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { getCurrentContext } from '../canvas'
import { Context } from '../page'

const clipPath: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext.main()
		context.save()
		context.clip()
	}

export { clipPath as main }
