import store from '../../store'
import houndstoothDefaults from '../store/houndstoothDefaults'
import interfaceUtilities from '../utilities/interfaceUtilities'

export default () => {
	interfaceUtilities.deleteElementIfExists('.mixed-down-canvas')

	const mixedDownCanvas = document.createElement('canvas')
	mixedDownCanvas.classList.add('mixed-down-canvas')
	document.body.appendChild(mixedDownCanvas)

	const canvasSize = store.mainHoundstooth.basePattern.viewSettings && store.mainHoundstooth.basePattern.viewSettings.canvasSize || houndstoothDefaults.CANVAS_SIZE
	mixedDownCanvas.width = canvasSize
	mixedDownCanvas.height = canvasSize
	mixedDownCanvas.style.display = 'none'

	store.mixedDownCanvas = mixedDownCanvas
}
