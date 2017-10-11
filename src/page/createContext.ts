import { document } from '../utilities/windowWrapper'
import { Dimensions } from './types'

type CreateContext = { ({}: { canvasContainer: any, canvasDimensions: Dimensions }): HTMLCanvasElement }
const createContext: CreateContext = ({ canvasContainer, canvasDimensions }) => {
	const canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.width = canvasDimensions[ 0 ]
	canvas.height = canvasDimensions[ 1 ]

	canvasContainer.appendChild(canvas)

	return canvas.getContext('2d')
}

export default createContext
