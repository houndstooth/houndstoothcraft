// tslint:disable:no-unsafe-any

import { getCurrentContext } from '../canvas'

const fillPath: () => void =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.closePath()
		context.fill()
	}

export default fillPath
