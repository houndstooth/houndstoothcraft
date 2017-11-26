// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { getCurrentContext } from '../canvas'
import { Context } from '../page'

const fillPath: NullarySideEffector =
	(): void => {
		const context: Context = getCurrentContext.main()
		context.closePath()
		context.fill()
	}

export { fillPath as main }
