// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../constants'
import { to } from '../../utilities'
import scaleElement from './scaleElement'
import { documentWrapper } from './windowWrapper'

const scaleCanvasContainer: () => HTMLElement =
	(): HTMLElement => {
		const canvasContainer: HTMLElement = documentWrapper.querySelector('#canvas-container')

		scaleElement({ element: canvasContainer, dimensions: to.Dimensions([ CANVAS_SIZE, CANVAS_SIZE ]) })

		return canvasContainer
	}

export default scaleCanvasContainer
