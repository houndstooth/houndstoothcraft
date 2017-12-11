// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import getCurrentContext from './getCurrentContext'

const resetClip: NullarySideEffector =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext()
		context.restore()
	}

export default resetClip
