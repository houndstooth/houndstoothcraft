// tslint:disable:no-unsafe-any

import getCurrentContext from './getCurrentContext'

const resetClip: () => void =
	(): void => {
		const context: CanvasRenderingContext2D = getCurrentContext()
		context.restore()
	}

export default resetClip
