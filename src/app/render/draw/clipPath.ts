// tslint:disable:no-unsafe-any

import { getCurrentContext } from '../canvas'

const clipPath: () => void =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext.default()
		context.save()
		context.clip()
	}

export default clipPath
