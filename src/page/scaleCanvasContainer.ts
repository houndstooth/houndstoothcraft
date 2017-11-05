// tslint:disable:no-unsafe-any

import { to } from '../index'
import { getFromBaseOrDefaultPattern } from '../store'
import { document } from '../utilities/windowWrapper'
import { scaleElement } from './scaleElement'
import { PageElement, Px } from './types'

const scaleCanvasContainer: () => PageElement =
	(): PageElement => {
		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')

		const canvasContainer: PageElement = document.querySelector('#canvas-container')

		scaleElement({ element: canvasContainer, dimensions: to.Dimensions([ canvasSize, canvasSize ]) })

		return canvasContainer
	}

export { scaleCanvasContainer }
