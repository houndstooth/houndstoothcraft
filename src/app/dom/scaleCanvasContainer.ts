// tslint:disable:no-unsafe-any

import { to } from '../../utilities'
import { getSetting } from '../settings'
import scaleElement from './scaleElement'
import { PageElement, Px } from './types'
import { documentWrapper } from './windowWrapper'

const scaleCanvasContainer: () => PageElement =
	(): PageElement => {
		const canvasSize: Px = getSetting.default('canvasSize')

		const canvasContainer: PageElement = documentWrapper.querySelector('#canvas-container')

		scaleElement({ element: canvasContainer, dimensions: to.Dimensions([ canvasSize, canvasSize ]) })

		return canvasContainer
	}

export default scaleCanvasContainer
