import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'
import canvasContainer from '../interface/canvasContainer'
import interfaceUtilities from '../utilities/interfaceUtilities'

export default () => {
	store.canvases = []
	canvasContainer.innerHTML = ''

	const canvasSize = store.mainHoundstooth.basePattern.viewSettings && store.mainHoundstooth.basePattern.viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
	const canvasSizePx = `${canvasSize}px`
	canvasContainer.style.width = canvasSizePx
	canvasContainer.style.height = canvasSizePx

	interfaceUtilities.iterationFrameIterator().forEach(canvasIndex => {
		const canvasClass = `real-canvas-${canvasIndex}`

		const canvas = document.createElement('canvas')
		canvas.classList.add(canvasClass)
		canvas.style.position = 'absolute'
		canvas.width = canvasSize
		canvas.height = canvasSize

		canvasContainer.appendChild(canvas)

		store.canvases.push(canvas)
	})
}
