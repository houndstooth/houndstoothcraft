import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'
import canvasContainer from '../interface/canvasContainer'
import interfaceUtilities from '../utilities/interfaceUtilities'

export default () => {
	store.canvases = []
	canvasContainer.innerHTML = ''

	const viewSettings = store.mainHoundstooth.basePattern.viewSettings
	const canvasSize = viewSettings && viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
	interfaceUtilities.setElementDimensions(canvasContainer, canvasSize)

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
