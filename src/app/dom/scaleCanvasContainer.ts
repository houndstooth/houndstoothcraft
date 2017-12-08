// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../constants'
import { globalWrapper, to } from '../../utilities'
import scaleElement from './scaleElement'

const scaleCanvasContainer: () => HTMLElement =
	(): HTMLElement => {
		const canvasContainer: HTMLElement = globalWrapper.document.querySelector('#canvas-container') as HTMLElement

		scaleElement({ element: canvasContainer, dimensions: to.Dimensions([ CANVAS_SIZE, CANVAS_SIZE ]) })

		return canvasContainer
	}

export default scaleCanvasContainer
