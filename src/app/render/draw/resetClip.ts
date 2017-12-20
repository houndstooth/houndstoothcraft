// tslint:disable:no-unsafe-any

import { getCurrentContext } from '../canvas'

const resetClip: () => void =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.restore()
	}

export default resetClip
