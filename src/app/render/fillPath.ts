// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { getCurrentContext } from '../canvas'

const fillPath: NullarySideEffector =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.closePath()
		context.fill()
	}

export default fillPath
