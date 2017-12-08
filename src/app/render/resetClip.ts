// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { getCurrentContext } from '../canvas'

const resetClip: NullarySideEffector =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.restore()
	}

export default resetClip
