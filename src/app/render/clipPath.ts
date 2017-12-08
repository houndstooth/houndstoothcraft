// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { getCurrentContext } from '../canvas'

const clipPath: NullarySideEffector =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.save()
		context.clip()
	}

export default clipPath
