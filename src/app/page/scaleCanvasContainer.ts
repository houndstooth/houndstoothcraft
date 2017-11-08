// tslint:disable:no-unsafe-any

import * as to from '../../to'
import { documentWrapper } from '../../utilities/windowWrapper'
import { getFromBaseOrDefaultPattern } from '../store/getFromBaseOrDefaultPattern'
import { scaleElement } from './scaleElement'
import { PageElement, Px } from './types'

const scaleCanvasContainer: () => PageElement =
	(): PageElement => {
		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')

		const canvasContainer: PageElement = documentWrapper.querySelector('#canvas-container')

		scaleElement({ element: canvasContainer, dimensions: to.Dimensions([ canvasSize, canvasSize ]) })

		return canvasContainer
	}

export { scaleCanvasContainer }
