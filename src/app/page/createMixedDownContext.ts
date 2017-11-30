// tslint:disable:no-unsafe-any

import { documentWrapper } from '../../utilities'
import { getSetting } from '../store'
import { Canvas, Context, PageElement, Px } from './types'

const createMixedDownContext: () => Context =
	(): Context => {
		const canvasContainer: PageElement = documentWrapper.querySelector('#canvas-container')

		const mixedDownCanvas: Canvas = documentWrapper.createElement('canvas')
		mixedDownCanvas.classList.add('mixed-down-canvas')
		canvasContainer.appendChild(mixedDownCanvas)

		const canvasSize: Px = getSetting.default('canvasSize')
		mixedDownCanvas.width = canvasSize
		mixedDownCanvas.height = canvasSize

		return mixedDownCanvas.getContext('2d')
	}

export default createMixedDownContext
