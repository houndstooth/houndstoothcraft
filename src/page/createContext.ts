import { state } from '../state'
import { defaults } from '../store'
import { document } from '../utilities/windowWrapper'
import { Context, PageElement } from './types'

const createContext: (_: { canvasContainer: PageElement }) => Context = ({ canvasContainer }) => {
	const { canvasSize = defaults.DEFAULT_CANVAS_SIZE } = state.mainHoundstooth.basePattern.viewSettings || {}
	const canvas = document.createElement('canvas')
	canvas.style.position = 'absolute'
	canvas.width = canvasSize
	canvas.height = canvasSize

	canvasContainer.appendChild(canvas)

	return canvas.getContext('2d')
}

// tslint:disable-next-line:no-default-export
export default createContext
