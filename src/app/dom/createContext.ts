// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../constants'
import { state } from '../state'
import { Canvas, Context, PageElement } from './types'
import { documentWrapper } from './windowWrapper'

const createContext: (_: { canvasContainer: PageElement }) => Context =
	({ canvasContainer }: { canvasContainer: PageElement }): Context => {
		const canvas: Canvas = documentWrapper.createElement('canvas')
		canvas.width = CANVAS_SIZE
		canvas.height = CANVAS_SIZE
		canvas.style.position = 'absolute'
		canvas.style.display = state.controls.animating ? 'none' : 'block'

		canvasContainer.appendChild(canvas)

		return canvas.getContext('2d')
	}

export default createContext
