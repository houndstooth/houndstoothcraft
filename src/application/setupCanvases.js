import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'
import canvasContainer from '../interface/canvasContainer'
import interfaceUtilities from '../utilities/interfaceUtilities'

export default () => {
	store.canvases = []
	canvasContainer.innerHTML = ''

	const canvasSize = store.mainHoundstooth.basePattern.viewSettings && store.mainHoundstooth.basePattern.viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
	canvasContainer.style.width = canvasSize
	canvasContainer.style.height = canvasSize

	interfaceUtilities.iterationFrameIterator().forEach(canvasIndex => {
		const canvasClass = `realCanvas-${canvasIndex}`
		let canvas = document.querySelector(`.${canvasClass}`)

		if (!canvas) {
			canvas = document.createElement('canvas')
			canvas.classList.add(canvasClass)
			canvas.style.position = 'absolute'
			canvasContainer.appendChild(canvas)

			store.canvases.push(canvas)
		}

		canvas.width = canvasSize
		canvas.height = canvasSize
	})
}
