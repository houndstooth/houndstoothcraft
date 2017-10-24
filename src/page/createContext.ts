import { getFromBaseOrDefaultPattern } from '../store'
import { document } from '../utilities/windowWrapper'
import { Context, PageElement, Px } from './types'

const createContext: (_: { canvasContainer: PageElement }) => Context = ({ canvasContainer }) => {
	const canvasSize: Px = getFromBaseOrDefaultPattern('canvasSize')
	const canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.width = canvasSize
	canvas.height = canvasSize

	canvasContainer.appendChild(canvas)

	return canvas.getContext('2d')
}

// tslint:disable-next-line:no-default-export
export default createContext
