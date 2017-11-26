// tslint:disable:no-unsafe-any

import { getFromBaseOrDefaultPattern } from '../../app'
import { documentWrapper } from '../../utilities'
import { Canvas, Context, PageElement, Px } from './types'

const createContext: (_: { canvasContainer: PageElement }) => Context =
	({ canvasContainer }: { canvasContainer: PageElement }): Context => {
		const canvasSize: Px = getFromBaseOrDefaultPattern.main('canvasSize')
		const canvas: Canvas = documentWrapper.createElement('canvas')
		canvas.width = canvasSize
		canvas.height = canvasSize
		canvas.style.position = 'absolute'

		canvasContainer.appendChild(canvas)

		return canvas.getContext('2d')
	}

// tslint:disable-next-line:no-default-export
export default createContext
