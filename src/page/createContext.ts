import { document } from '../utilities/windowWrapper'
import { Dimension, PageElement, Context } from './types'

const createContext: {
	({}: { canvasContainer: PageElement, canvasDimensions: Dimension[] }): Context,
} = ({ canvasContainer, canvasDimensions }) => {
	const canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.width = canvasDimensions[ 0 ]
	canvas.height = canvasDimensions[ 1 ]

	canvasContainer.appendChild(canvas)

	return canvas.getContext('2d')
}

export default createContext
