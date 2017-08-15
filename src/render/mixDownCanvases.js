import store from '../../store'
import interfaceUtilities from '../utilities/interfaceUtilities'

export default () => {
	interfaceUtilities.iterationFrameIterator().forEach(canvasIndex => {
		const canvas = store.canvases[canvasIndex]
		store.mixedDownCanvas.getContext('2d').drawImage(canvas, 0, 0)
	})
}
