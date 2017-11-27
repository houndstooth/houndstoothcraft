// tslint:disable:no-unsafe-any

import { documentWrapper } from '../../utilities'
import { getSetting } from '../store'
import deleteElementIfExists from './deleteElementIfExists'
import { Canvas, Context, Px } from './types'

const createMixedDownContext: () => Context =
	(): Context => {
		deleteElementIfExists('.mixed-down-canvas')

		const mixedDownCanvas: Canvas = documentWrapper.createElement('canvas')
		mixedDownCanvas.classList.add('mixed-down-canvas')
		documentWrapper.body.appendChild(mixedDownCanvas)

		const canvasSize: Px = getSetting.default('canvasSize')
		mixedDownCanvas.width = canvasSize
		mixedDownCanvas.height = canvasSize

		mixedDownCanvas.style.display = 'none'

		return mixedDownCanvas.getContext('2d')
	}

export default createMixedDownContext
