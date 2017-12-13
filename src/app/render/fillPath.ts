// tslint:disable:no-unsafe-any

import getCurrentContext from './getCurrentContext'

const fillPath: () => void =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext()
		context.closePath()
		context.fill()
	}

export default fillPath
