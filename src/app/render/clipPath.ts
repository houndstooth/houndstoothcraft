// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import getCurrentContext from './getCurrentContext'

const clipPath: NullarySideEffector =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext()
		context.save()
		context.clip()
	}

export default clipPath
