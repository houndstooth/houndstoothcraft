// tslint:disable:no-unsafe-any

import { documentWrapper } from '../../utilities'
import { getFromBaseOrDefaultPattern } from '../store/getFromBaseOrDefaultPattern'
import { Canvas, Context, PageElement, Px } from './types'

const createContext: (_: { canvasContainer: PageElement }) => Context =
	({ canvasContainer }: { canvasContainer: PageElement }): Context => {
		const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')
		const canvas: Canvas = documentWrapper.createElement('canvas')
		canvas.width = canvasSize
		canvas.height = canvasSize
		canvas.style.position = 'absolute'

		canvasContainer.appendChild(canvas)

		return canvas.getContext('2d')
	}

// tslint:disable-next-line:no-default-export
export default createContext
