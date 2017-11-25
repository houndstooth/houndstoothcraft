// tslint:disable:no-unsafe-any

import * as to from '../../to'
import { documentWrapper } from '../../utilities'
// tslint:disable-next-line:no-reaching-imports
import { main as getFromBaseOrDefaultPattern } from '../store/getFromBaseOrDefaultPattern'
import { main as scaleElement } from './scaleElement'
import { PageElement, Px } from './types'

const scaleCanvasContainer: () => PageElement =
	(): PageElement => {
		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')

		const canvasContainer: PageElement = documentWrapper.querySelector('#canvas-container')

		scaleElement({ element: canvasContainer, dimensions: to.Dimensions([ canvasSize, canvasSize ]) })

		return canvasContainer
	}

export { scaleCanvasContainer as main }
