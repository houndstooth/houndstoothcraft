// tslint:disable:no-unsafe-any

import getCurrentContext from './getCurrentContext'

const clipPath: () => void =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext()
		context.save()
		context.clip()
	}

export default clipPath
