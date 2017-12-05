// tslint:disable:no-unsafe-any

import { getSetting } from '../../app'
import { state } from '../../state'
import { Canvas, Context, PageElement, Px } from './types'
import { documentWrapper } from './windowWrapper'

const createContext: (_: { canvasContainer: PageElement }) => Context =
	({ canvasContainer }: { canvasContainer: PageElement }): Context => {
		const canvasSize: Px = getSetting.default('canvasSize')
		const canvas: Canvas = documentWrapper.createElement('canvas')
		canvas.width = canvasSize
		canvas.height = canvasSize
		canvas.style.position = 'absolute'
		canvas.style.display = state.controls.animating ? 'none' : 'block'

		canvasContainer.appendChild(canvas)

		return canvas.getContext('2d')
	}

export default createContext
