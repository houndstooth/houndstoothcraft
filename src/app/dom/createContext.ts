// tslint:disable:no-unsafe-any

import { CANVAS_SIZE } from '../../constants'
import { from, globalWrapper } from '../../utilities'
import { appState } from '../appState'

const createContext: (_: { canvasContainer: HTMLElement }) => CanvasRenderingContext2D =
	({ canvasContainer }: { canvasContainer: HTMLElement }): CanvasRenderingContext2D => {
		const canvas: HTMLCanvasElement = globalWrapper.document.createElement('canvas')
		canvas.width = from.Px(CANVAS_SIZE)
		canvas.height = from.Px(CANVAS_SIZE)
		canvas.style.position = 'absolute'
		canvas.style.display = appState.controls.animating ? 'none' : 'block'

		canvasContainer.appendChild(canvas)

		return canvas.getContext('2d') as CanvasRenderingContext2D
	}

export default createContext
