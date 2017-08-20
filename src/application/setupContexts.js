import store from '../../store'
import colorUtilities from '../utilities/colorUtilities'

export default () => {
	store.contexts = []

	const colorSettings = store.mainHoundstooth.basePattern.colorSettings
	const backgroundColor = colorSettings && colorSettings.backgroundColor

	store.canvases.forEach(canvas => {
		const context = canvas.getContext('2d')
		store.contexts.push(context)

		if (backgroundColor) {
			const width = store.canvases[0].width
			const height = store.canvases[0].height
			context.fillStyle = colorUtilities.parseColor(backgroundColor[ 0 ])
			context.fillRect(0, 0, width, height)
		}
	})
}
