// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import getCurrentContext from './getCurrentContext'

const fillPath: NullarySideEffector =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext()
		context.closePath()
		context.fill()
	}

export default fillPath
