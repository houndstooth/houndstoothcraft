import colorUtilities from '../utilities/colorUtilities'
import store from '../../store'

export default ({ shapeColor, outline }) => {
	if (outline.length < 3) return

	const context = store.contexts[store.iterationFrame]

	context.fillStyle = colorUtilities.parseColor(shapeColor)
	context.beginPath()

	context.moveTo(outline[ 0 ][ 0 ], outline[ 0 ][ 1 ])
	outline.slice(1).forEach(coordinate => context.lineTo(coordinate[ 0 ], coordinate[ 1 ]))

	context.closePath()
	context.fill()
}
