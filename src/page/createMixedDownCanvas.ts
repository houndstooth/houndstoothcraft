import { getCanvasDimensions } from '../canvas'
import { document } from '../utilities/windowWrapper'
import { deleteElementIfExists } from './deleteElementIfExists'
import { Context } from './types'

const createMixedDownCanvas: () => Context = () => {
	deleteElementIfExists('.mixed-down-canvas')

	const mixedDownCanvas = document.createElement('canvas')
	mixedDownCanvas.classList.add('mixed-down-canvas')
	document.body.appendChild(mixedDownCanvas)

	const canvasDimensions = getCanvasDimensions()
	mixedDownCanvas.width = canvasDimensions[ 0 ]
	mixedDownCanvas.height = canvasDimensions[ 1 ]

	mixedDownCanvas.style.display = 'none'

	return mixedDownCanvas.getContext('2d')
}

// tslint:disable-next-line:no-default-export
export default createMixedDownCanvas
