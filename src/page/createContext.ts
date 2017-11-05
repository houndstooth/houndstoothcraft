// tslint:disable:no-unsafe-any

import { getFromBaseOrDefaultPattern } from '../store'
import { document } from '../utilities/windowWrapper'
import { Canvas, Context, PageElement, Px } from './types'

const createContext: (_: { canvasContainer: PageElement }) => Context =
	({ canvasContainer }: { canvasContainer: PageElement }): Context => {
		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')
		const canvas: Canvas = document.createElement('canvas')
		canvas.width = canvasSize
		canvas.height = canvasSize
		canvas.style.position = 'absolute'

		canvasContainer.appendChild(canvas)

		return canvas.getContext('2d')
	}

// tslint:disable-next-line:no-default-export
export default createContext
