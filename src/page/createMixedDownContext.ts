import { getFromBaseOrDefaultPattern } from '../store'
import { document } from '../utilities/windowWrapper'
import { deleteElementIfExists } from './deleteElementIfExists'
import { Context, Px } from './types'

const createMixedDownContext: () => Context = () => {
	deleteElementIfExists('.mixed-down-canvas')

	const mixedDownCanvas = document.createElement('canvas')
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
