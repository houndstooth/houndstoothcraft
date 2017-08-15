import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'

export default () => {
	let mixedDownCanvas = document.querySelector('.mixed-down-canvas')

	if (!mixedDownCanvas) {
		mixedDownCanvas = document.createElement('canvas')
		mixedDownCanvas.classList.add('mixed-down-canvas')
		document.body.appendChild(mixedDownCanvas)

		const canvasSize = store.mainHoundstooth.basePattern.viewSettings && store.mainHoundstooth.basePattern.viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
		mixedDownCanvas.width = canvasSize
		mixedDownCanvas.height = canvasSize
		mixedDownCanvas.style.display = 'none'
	}

	store.mixedDownCanvas = mixedDownCanvas
}
