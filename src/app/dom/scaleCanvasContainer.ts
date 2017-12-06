// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../constants'
import { to } from '../../utilities'
import scaleElement from './scaleElement'
import { PageElement } from './types'
import { documentWrapper } from './windowWrapper'

const scaleCanvasContainer: () => PageElement =
	(): PageElement => {
		const canvasContainer: PageElement = documentWrapper.querySelector('#canvas-container')

		scaleElement({ element: canvasContainer, dimensions: to.Dimensions([ CANVAS_SIZE, CANVAS_SIZE ]) })

		return canvasContainer
	}

export default scaleCanvasContainer
