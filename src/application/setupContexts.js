import store from '../../store'
import colorUtilities from '../utilities/colorUtilities'
import interfaceUtilities from '../utilities/interfaceUtilities'

export default () => {
	store.contexts = []

	const backgroundColor = store.mainHoundstooth.basePattern.colorSettings && store.mainHoundstooth.basePattern.colorSettings.backgroundColor

	interfaceUtilities.iterationFrameIterator().forEach(contextIndex => {
		const context = store.canvases[contextIndex].getContext('2d')
		store.contexts.push(context)

		if (backgroundColor) {
			const width = store.canvases[0].width
			const height = store.canvases[0].height
			context.fillStyle = colorUtilities.parseColor(backgroundColor[ 0 ])
			context.fillRect(0, 0, width, height)
		}
	})
}
