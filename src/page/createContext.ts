import { document } from '../utilities/windowWrapper'
import { Dimensions, PageElement } from './types'

type CreateContext = { ({}: { canvasContainer: PageElement, canvasDimensions: Dimensions }): CanvasRenderingContext2D }
const createContext: CreateContext = ({ canvasContainer, canvasDimensions }) => {
	const canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.width = canvasDimensions[ 0 ]
	canvas.height = canvasDimensions[ 1 ]

	canvasContainer.appendChild(canvas)

	return canvas.getContext('2d')
}

export default createContext
