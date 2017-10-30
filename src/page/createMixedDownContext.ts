// tslint:disable:no-unsafe-any

import { getFromBaseOrDefaultPattern } from '../store'
import { document } from '../utilities/windowWrapper'
import { deleteElementIfExists } from './deleteElementIfExists'
import { Canvas, Context, Px } from './types'

const createMixedDownContext: () => Context =
	(): Context => {
		deleteElementIfExists('.mixed-down-canvas')

		const mixedDownCanvas: Canvas = document.createElement('canvas')
		mixedDownCanvas.classList.add('mixed-down-canvas')
		document.body.appendChild(mixedDownCanvas)

		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')
		mixedDownCanvas.width = canvasSize
		mixedDownCanvas.height = canvasSize

		mixedDownCanvas.style.display = 'none'

		return mixedDownCanvas.getContext('2d')
	}

// tslint:disable-next-line:no-default-export
export default createMixedDownContext
