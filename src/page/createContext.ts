import { document } from '../utilities/windowWrapper'
import { Context, Dimension, PageElement } from './types'

const createContext: (_: {
	canvasContainer: PageElement, canvasDimensions: Dimension[],
}) => Context = ({ canvasContainer, canvasDimensions }) => {
	const canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.width = canvasDimensions[ 0 ]
	canvas.height = canvasDimensions[ 1 ]

	canvasContainer.appendChild(canvas)

	return canvas.getContext('2d')
}

export default createContext
